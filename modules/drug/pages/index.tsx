'use client';
import { DRUG_LOCALE } from '../constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import { DrugsTable, DrugDrawer } from '../components';
import { drugApi } from '../api';
import { type Drug } from '../types';
import {
  SuccessChip,
  WarningChip,
  ErrorChip,
} from '../../common/components/status-chip';

const LIMIT = 10;
const DEBOUNCE_DELAY_MS = 500;

export default function DrugsPage() {
  const { t } = useTranslation(DRUG_LOCALE);
  const [searchText, setSearchText] = useState('');
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDrug, setEditingDrug] = useState<Drug | null>(null);
  const [deletingDrug, setDeletingDrug] = useState<Drug | null>(null);

  const isFetchingRef = useRef(false);

  const [getDrugsFn, { loading, error }] = drugApi.useGetDrugsLazyQuery();
  const [deleteDrugFn, { loading: deleting, error: deleteError }] =
    drugApi.useDeleteDrugMutation();

  const fetchDrugs = useCallback(
    async (requestOffset: number, reset: boolean, search: string) => {
      if (isFetchingRef.current) {
        return;
      }

      isFetchingRef.current = true;

      try {
        const { data } = await getDrugsFn({
          variables: {
            input: {
              limit: LIMIT,
              offset: requestOffset,
              search: {
                searchText: search.trim() || undefined,
              },
            },
          },
        });

        const result = data?.drugs;

        if (result) {
          setDrugs((prev) =>
            reset ? result.drugs : [...prev, ...result.drugs],
          );
          setOffset(requestOffset + result.drugs.length);
          setHasMore(result.hasMore);
        }
      } finally {
        isFetchingRef.current = false;
      }
    },
    [getDrugsFn],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMore(true);
      fetchDrugs(0, true, searchText);
    }, DEBOUNCE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [searchText, fetchDrugs]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleLoadMore = () => {
    if (!hasMore || isFetchingRef.current) {
      return;
    }

    fetchDrugs(offset, false, searchText);
  };

  const handleAddDrug = () => {
    setEditingDrug(null);
    setDrawerOpen(true);
  };

  const handleEditDrug = (drug: Drug) => {
    setEditingDrug(drug);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrugCreated = () => {
    fetchDrugs(0, true, searchText);
  };

  const handleDrugUpdated = (drug: Drug) => {
    setDrugs((prev) => prev.map((item) => (item.id === drug.id ? drug : item)));
  };

  const handleDeleteDrug = (drug: Drug) => {
    setDeletingDrug(drug);
  };

  const handleDeleteCancel = () => {
    setDeletingDrug(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingDrug) {
      return;
    }

    const { data } = await deleteDrugFn({
      variables: { input: { id: deletingDrug.id } },
    });

    if (data?.deleteDrug) {
      setDrugs((prev) => prev.filter((item) => item.id !== deletingDrug.id));
      setDeletingDrug(null);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        minWidth: 0,
        maxWidth: 1600,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          label={t('page.searchLabel')}
          variant='outlined'
          size='small'
          value={searchText}
          onChange={handleSearchChange}
          sx={{ width: { xs: '100%', sm: 300 } }}
          placeholder={t('page.searchPlaceholder')}
        />

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleAddDrug}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {t('page.addDrug')}
        </Button>
      </Box>

      {error && (
        <Typography color='error'>
          {t('page.loadingError')} {error.message}
        </Typography>
      )}

      {loading && drugs.length === 0 ? (
        <CircularProgress sx={{ mx: 'auto', mt: 4 }} />
      ) : (
        <DrugsTable
          drugs={drugs}
          onEdit={handleEditDrug}
          onDelete={handleDeleteDrug}
          hasMore={hasMore}
          isLoadingMore={loading && drugs.length > 0}
          onLoadMore={handleLoadMore}
        />
      )}
      <SuccessChip message='Operation successful' />
      <ErrorChip message='An error occurred' />
      <WarningChip message='This is a warning' />
      <DrugDrawer
        open={drawerOpen}
        drug={editingDrug}
        onClose={handleDrawerClose}
        onCreated={handleDrugCreated}
        onUpdated={handleDrugUpdated}
      />

      <Dialog open={!!deletingDrug} onClose={handleDeleteCancel}>
        <DialogTitle>{t('page.deleteTitle')}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {t('page.deleteConfirmation', { name: deletingDrug?.name })}
          </DialogContentText>

          {deleteError && (
            <Typography color='error' sx={{ mt: 1 }}>
              {deleteError.message}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={deleting}>
            {t('page.cancel')}
          </Button>

          <Button
            color='error'
            variant='contained'
            onClick={handleDeleteConfirm}
            disabled={deleting}
          >
            {t('page.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
