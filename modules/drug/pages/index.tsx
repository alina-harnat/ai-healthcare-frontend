'use client';

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

import { DrugsTable, DrugDrawer } from '../components';
import { drugApi } from '../api';
import { type Drug } from '../types';

const LIMIT = 10;
const DEBOUNCE_DELAY_MS = 500;

export default function DrugsPage() {
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
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <TextField
          label='Search drugs'
          variant='outlined'
          size='small'
          value={searchText}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
          placeholder='Type to search...'
        />

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleAddDrug}
        >
          Add drug
        </Button>
      </Box>

      {error && (
        <Typography color='error'>
          Error loading drugs: {error.message}
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

      <DrugDrawer
        open={drawerOpen}
        drug={editingDrug}
        onClose={handleDrawerClose}
        onCreated={handleDrugCreated}
        onUpdated={handleDrugUpdated}
      />

      <Dialog open={!!deletingDrug} onClose={handleDeleteCancel}>
        <DialogTitle>Delete drug</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{deletingDrug?.name}&quot;?
            This action cannot be undone.
          </DialogContentText>

          {deleteError && (
            <Typography color='error' sx={{ mt: 1 }}>
              {deleteError.message}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={deleting}>
            Cancel
          </Button>

          <Button
            color='error'
            variant='contained'
            onClick={handleDeleteConfirm}
            disabled={deleting}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
