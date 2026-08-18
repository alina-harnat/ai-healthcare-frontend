import { StatusChipVariant } from '@/modules/common/enums';
import { StatusChip } from './status-chip';

interface SuccessChipProps {
  message: string;
  maxWidth?: number | string;
  className?: string;
}

export const SuccessChip = ({
  message,
  maxWidth,
  className,
}: SuccessChipProps) => (
  <StatusChip
    variant={StatusChipVariant.Success}
    message={message}
    maxWidth={maxWidth}
    className={className}
  />
);
