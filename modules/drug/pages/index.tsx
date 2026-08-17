'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';

import { DrugsTable, Drug } from '../components';
import { drugApi } from '../api';

const LIMIT = 10;
const DEBOUNCE_DELAY_MS = 500;

export default function DrugsPage() {
  const [searchText, setSearchText] = useState('');
  const [offset, setOffset] = useState(0);

  const [getDrugsFn, { data, loading, error }] = drugApi.useGetDrugsLazyQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      getDrugsFn({
        variables: {
          input: {
            limit: LIMIT,
            offset,
            filters: {
              searchText: searchText.trim() || undefined,
            },
          },
        },
      });
    }, DEBOUNCE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [searchText, offset, getDrugsFn]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setOffset(0);
  };

  const handleNextPage = () => setOffset((prev) => prev + LIMIT);
  const handlePrevPage = () => setOffset((prev) => Math.max(0, prev - LIMIT));

  const handleEditDrug = (drug: Drug) => {
    console.log('Edit drug:', drug);
  };

  const drugs = data?.getDrugs?.drugs || [];
  const hasMore = data?.getDrugs?.hasMore || false;

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label='Search drugs'
          variant='outlined'
          size='small'
          value={searchText}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
          placeholder='Type to search...'
        />
      </Box>

      {error && (
        <Typography color='error'>
          Error loading drugs: {error.message}
        </Typography>
      )}

      {loading && drugs.length === 0 ? (
        <CircularProgress sx={{ mx: 'auto', mt: 4 }} />
      ) : (
        <DrugsTable drugs={drugs} onEdit={handleEditDrug} />
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Button
          disabled={offset === 0 || loading}
          onClick={handlePrevPage}
          variant='outlined'
        >
          Previous
        </Button>

        <Typography variant='body2'>
          Page {Math.floor(offset / LIMIT) + 1}
        </Typography>

        <Button
          disabled={!hasMore || loading}
          onClick={handleNextPage}
          variant='outlined'
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
