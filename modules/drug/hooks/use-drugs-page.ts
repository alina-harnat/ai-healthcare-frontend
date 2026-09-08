'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { DRUG_LOCALE } from '../constants';
import { useTablePageSize } from '@/modules/common/hooks';
import {
  ROW_HEIGHT,
  HEADER_HEIGHT,
} from '../components/drugs-table/drugs-table-styles';
import { drugApi } from '../api';
import type { Drug } from '../types';
import type { DrugFormValues } from '../schemas';
import { useHasPermissions } from '@/modules/common/hooks/use-permissions';

const DEBOUNCE_DELAY_MS = 500;
const MIN_PAGE_SIZE = 5;
const MAX_PAGE_SIZE = 25;
const RESERVED_HEIGHT = 260;

export const useDrugsPage = () => {
  const { t } = useTranslation(DRUG_LOCALE);
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [createError, setCreateError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDrug, setEditingDrug] = useState<Drug | null>(null);
  const [deletingDrug, setDeletingDrug] = useState<Drug | null>(null);
  const [initializing, setInitializing] = useState(true);

  const { hasPermission } = useHasPermissions();

  const pendingDrugIdRef = useRef<string | null>(null);

  const pageSize = useTablePageSize({
    rowHeight: ROW_HEIGHT,
    headerHeight: HEADER_HEIGHT,
    reservedHeight: RESERVED_HEIGHT,
    minRows: MIN_PAGE_SIZE,
    maxRows: MAX_PAGE_SIZE,
  });

  const [getDrugsFn, { loading, error }] = drugApi.useGetDrugsLazyQuery();

  const [deleteDrugFn, { loading: deleting, error: deleteError }] =
    drugApi.useDeleteDrugMutation();

  const fetchDrugs = useCallback(
    async (requestPage: number, search: string) => {
      setInitializing(true);

      try {
        const { data } = await getDrugsFn({
          variables: {
            input: {
              limit: pageSize,
              offset: requestPage * pageSize,
              search: {
                searchText: search.trim() || undefined,
              },
            },
          },
        });

        const result = data?.drugs;

        if (result) {
          setDrugs(result.drugs);
          setHasMore(result.hasMore);
        }
      } finally {
        setInitializing(false);
      }
    },
    [getDrugsFn, pageSize],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(0);
      fetchDrugs(0, searchText);
    }, DEBOUNCE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [searchText, pageSize, fetchDrugs]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchDrugs(newPage, searchText);
  };

  const handleAddDrug = () => {
    setEditingDrug(null);
    setDrawerOpen(true);
  };

  const handleGenerateDrug = () => {
    router.push('/drugs/generate');
  };

  const handleEditDrug = (drug: Drug) => {
    setEditingDrug(drug);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrugCreate = (values: DrugFormValues) => {
    const tempId = `temp-${Date.now()}`;

    pendingDrugIdRef.current = tempId;
    setCreateError(null);

    const optimisticDrug: Drug = {
      id: tempId,
      pending: true,
      ...values,
    };

    setPage(0);
    setDrugs((prev) => [optimisticDrug, ...prev]);
  };

  const handleDrugCreated = () => {
    pendingDrugIdRef.current = null;
    setDrawerOpen(false);
    setPage(0);
    fetchDrugs(0, searchText);
  };

  const handleDrugCreateError = () => {
    const tempId = pendingDrugIdRef.current;

    pendingDrugIdRef.current = null;

    if (tempId) {
      setDrugs((prev) => prev.filter((drug) => drug.id !== tempId));
    }

    setCreateError(t('page.createError'));
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
      variables: {
        input: {
          id: deletingDrug.id,
        },
      },
    });

    if (data?.deleteDrug) {
      setDrugs((prev) => prev.filter((drug) => drug.id !== deletingDrug.id));
      setDeletingDrug(null);
    }
  };

  return {
    t,
    searchText,
    drugs,
    page,
    hasMore,
    createError,
    drawerOpen,
    editingDrug,
    deletingDrug,
    initializing,
    loading,
    error,
    deleting,
    deleteError,
    handleSearchChange,
    handlePageChange,
    handleAddDrug,
    handleGenerateDrug,
    handleEditDrug,
    handleDrawerClose,
    handleDrugCreate,
    handleDrugCreated,
    handleDrugCreateError,
    handleDrugUpdated,
    handleDeleteDrug,
    handleDeleteCancel,
    handleDeleteConfirm,
    hasPermission,
  };
};
