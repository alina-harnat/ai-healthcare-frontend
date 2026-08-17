'use client';

import { useState, type KeyboardEvent } from 'react';
import { FormHelperText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { StyledChip } from '../drugs-table/drugs-table-styles';
import {
  FieldGroup,
  Label,
  StyledTextField,
  ChipInputRow,
  ChipsWrap,
} from './drug-drawer-styles';

interface ChipArrayFieldProps {
  label: string;
  placeholder?: string;
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

export const ChipArrayField = ({
  label,
  placeholder,
  values,
  onChange,
  error,
}: ChipArrayFieldProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();

    if (!trimmed || values.includes(trimmed)) {
      return;
    }

    onChange([...values, trimmed]);
    setInputValue('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd();
    }
  };

  const handleDelete = (item: string) => {
    onChange(values.filter((value) => value !== item));
  };

  return (
    <FieldGroup>
      <Label>{label}</Label>

      <ChipInputRow>
        <StyledTextField
          size='small'
          fullWidth
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <IconButton size='small' color='primary' onClick={handleAdd}>
          <AddIcon fontSize='small' />
        </IconButton>
      </ChipInputRow>

      <ChipsWrap>
        {values.map((item) => (
          <StyledChip
            key={item}
            label={item}
            size='small'
            variant='outlined'
            onDelete={() => handleDelete(item)}
          />
        ))}
      </ChipsWrap>

      {error && <FormHelperText error>{error}</FormHelperText>}
    </FieldGroup>
  );
};
