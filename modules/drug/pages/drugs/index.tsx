'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CropFreeIcon from '@mui/icons-material/CropFree';

import { DrugsTable, DrugDrawer } from '../../components';
import {
  PageContainer,
  Toolbar,
  SearchField,
  Actions,
  ActionButton,
  ErrorMessage,
  DeleteErrorMessage,
} from './drugs-page-styles';
import { useDrugsPage } from '../../hooks';
import { Permission } from '@/modules/common/enums';

export function DrugsPage() {
  const {
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
    handleRecognizeDrug,
    handleDetectObjects,
    handleImageSearch,
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
  } = useDrugsPage();

  return (
    <PageContainer>
      <Toolbar>
        <SearchField
          label={t('page.searchLabel')}
          variant='outlined'
          size='small'
          value={searchText}
          onChange={handleSearchChange}
          placeholder={t('page.searchPlaceholder')}
        />

        <Actions>
          <ActionButton
            variant='outlined'
            startIcon={<ImageSearchIcon />}
            onClick={handleImageSearch}
          >
            {t('page.imageSearch')}
          </ActionButton>

          {hasPermission(Permission.Admin) && (
            <>
              <ActionButton
                variant='outlined'
                startIcon={<CropFreeIcon />}
                onClick={handleDetectObjects}
              >
                {t('page.detectObjects')}
              </ActionButton>

              <ActionButton
                variant='outlined'
                startIcon={<AutoAwesomeIcon />}
                onClick={handleGenerateDrug}
              >
                {t('page.generateDrug')}
              </ActionButton>

              <ActionButton
                variant='outlined'
                startIcon={<ImageSearchIcon />}
                onClick={handleRecognizeDrug}
              >
                {t('page.recognizeDrug')}
              </ActionButton>

              <ActionButton
                variant='contained'
                startIcon={<AddIcon />}
                onClick={handleAddDrug}
              >
                {t('page.addDrug')}
              </ActionButton>
            </>
          )}
        </Actions>
      </Toolbar>

      {error && (
        <ErrorMessage>
          {t('page.loadingError')} {error.message}
        </ErrorMessage>
      )}

      {createError && <ErrorMessage>{createError}</ErrorMessage>}

      <DrugsTable
        drugs={drugs}
        onEdit={handleEditDrug}
        onDelete={handleDeleteDrug}
        page={page}
        hasMore={hasMore}
        loading={initializing || loading}
        onPageChange={handlePageChange}
      />

      <DrugDrawer
        open={drawerOpen}
        drug={editingDrug}
        onClose={handleDrawerClose}
        onCreate={handleDrugCreate}
        onCreated={handleDrugCreated}
        onCreateError={handleDrugCreateError}
        onUpdated={handleDrugUpdated}
      />

      <Dialog open={!!deletingDrug} onClose={handleDeleteCancel}>
        <DialogTitle>{t('page.deleteTitle')}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {t('page.deleteConfirmation', {
              name: deletingDrug?.name ?? '',
            })}
          </DialogContentText>

          {deleteError && (
            <DeleteErrorMessage>{deleteError.message}</DeleteErrorMessage>
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
    </PageContainer>
  );
}
