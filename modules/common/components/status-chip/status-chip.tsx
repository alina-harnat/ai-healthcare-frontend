'use client';

import { useEffect, useRef, useState, type ReactElement } from 'react';
import { Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';

import { StatusChipVariant } from '@/modules/common/enums';
import { StyledStatusChip, StatusChipLabel } from './status-chip-styles';

const VARIANT_ICONS: Record<StatusChipVariant, ReactElement> = {
  [StatusChipVariant.Success]: <CheckCircleIcon fontSize='small' />,
  [StatusChipVariant.Warning]: <WarningAmberIcon fontSize='small' />,
  [StatusChipVariant.Error]: <ErrorIcon fontSize='small' />,
};

export interface StatusChipProps {
  message: string;
  variant: StatusChipVariant;
  maxWidth?: number | string;
  className?: string;
}

export const StatusChip = ({
  message,
  variant,
  maxWidth,
  className,
}: StatusChipProps) => {
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = labelRef.current;

    if (element) {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    }
  }, [message, maxWidth]);

  const chip = (
    <StyledStatusChip
      className={className}
      variant='outlined'
      variantColor={variant}
      icon={VARIANT_ICONS[variant]}
      label={
        <StatusChipLabel ref={labelRef} labelMaxWidth={maxWidth}>
          {message}
        </StatusChipLabel>
      }
    />
  );

  if (!isTruncated) {
    return chip;
  }

  return (
    <Tooltip title={message} arrow>
      {chip}
    </Tooltip>
  );
};
