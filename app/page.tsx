import { DashboardLayout } from '@/modules/common/components';
import DrugsPage from '@/modules/drug/pages';

export default function Home() {
  return (
    <DashboardLayout>
      <DrugsPage />
    </DashboardLayout>
  );
}
