'use-client';

import { Sidebar } from '@/modules/common/components';
import DrugsTableTest from '@/modules/drug/pages';

export default function Home() {
  return (
    <>
      <Sidebar />
      <DrugsTableTest />
    </>
  );
}
