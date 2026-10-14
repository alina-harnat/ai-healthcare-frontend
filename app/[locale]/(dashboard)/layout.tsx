import { DashboardLayout } from '../../../modules/common/components';
import { ProtectedLayout } from '../../../modules/common/layouts/ProtectedLayout';

export default function SignedInDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedLayout>
  );
}
