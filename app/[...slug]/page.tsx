'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { layouts } from '../../core/router/layouts';
import { routeService } from '../../core/router/services';
import { useCurrentUser } from '../../modules/user/providers';

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

  const { currentUser, loading } = useCurrentUser();

  const redirect =
    route && !loading ? routeService.getRedirectPath(route, currentUser) : null;

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
    <LayoutComponent currentUser={currentUser}>
      <PageComponent />
    </LayoutComponent>
  );
}
