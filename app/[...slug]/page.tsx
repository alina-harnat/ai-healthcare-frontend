'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { userApi } from '../../modules/user/api';
import { layouts } from '../../core/router/layouts';
import { routeService } from '../../core/router/services';

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default function DynamicPage({ params }: PageProps) {
  const router = useRouter();
  const { slug } = use(params);

  const path = slug?.join('/') ?? '';

  const route = routeService.resolvePath(path);

  const { data, loading } = userApi.useCurrentUserQuery();

  const user = data?.currentUser ?? null;

  const redirect =
    route && !loading ? routeService.getRedirectPath(route, user) : null;

  useEffect(() => {
    if (redirect) {
      router.replace(redirect);
    }
  }, [redirect, router]);

  if (!route || loading || redirect) {
    return null;
  }

  const LayoutComponent = layouts[route.meta.layout];

  const PageComponent = route.meta.component;

  return (
    <LayoutComponent>
      <PageComponent />
    </LayoutComponent>
  );
}
