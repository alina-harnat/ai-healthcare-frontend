'use client';

import { Button } from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

import { ACCEPTED_IMAGE_TYPES } from '../../utils';

interface ImagePickerProps {
  label: string;
  disabled?: boolean;
  onChange: (file?: File) => void;
}

export function ImagePicker({ label, disabled, onChange }: ImagePickerProps) {
  return (
    <Button
      component='label'
      variant='outlined'
      startIcon={<ImageSearchIcon />}
      disabled={disabled}
      sx={{ alignSelf: 'flex-start' }}
    >
      {label}
      <input
        hidden
        type='file'
        accept={ACCEPTED_IMAGE_TYPES}
        onChange={(event) => {
          onChange(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
    </Button>
  );
}
