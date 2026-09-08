import { DashboardLayout } from '@/modules/common/components';
import DrugsPage from '@/modules/drug/pages/drugs';

export default function Home() {
  return (
    <DashboardLayout>
      <DrugsPage />
    </DashboardLayout>
  );
}
