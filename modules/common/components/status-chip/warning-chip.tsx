import { StatusChipVariant } from '@/modules/common/enums';
import { StatusChip } from './status-chip';

interface WarningChipProps {
  message: string;
  maxWidth?: number | string;
  className?: string;
}

export const WarningChip = ({
  message,
  maxWidth,
  className,
}: WarningChipProps) => (
  <StatusChip
    variant={StatusChipVariant.Warning}
    message={message}
    maxWidth={maxWidth}
    className={className}
  />
);
