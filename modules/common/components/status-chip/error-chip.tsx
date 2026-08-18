import { StatusChipVariant } from '@/modules/common/enums';
import { StatusChip } from './status-chip';

interface ErrorChipProps {
  message: string;
  maxWidth?: number | string;
  className?: string;
}

export const ErrorChip = ({ message, maxWidth, className }: ErrorChipProps) => (
  <StatusChip
    variant={StatusChipVariant.Error}
    message={message}
    maxWidth={maxWidth}
    className={className}
  />
);
