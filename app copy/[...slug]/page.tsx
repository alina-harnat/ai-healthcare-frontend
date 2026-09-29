import { layouts } from '../../core/router/layouts';
import { routeService } from '../../core/router/services';
import { userService } from '../../modules/user/services';

import { redirect } from '@/core/localization/navigation';
import { getLocale } from 'next-intl/server';

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  const path = `/${slug?.join('/') ?? ''}`;
  const route = routeService.resolvePath(path);

  if (!route) {
    return null;
  }

  const currentUser = await userService.getCurrentUser();

  const redirectPath = routeService.getRedirectPath(route, currentUser);

  if (redirectPath) {
    redirect({ href: redirectPath, locale: await getLocale() });
  }

  const LayoutComponent = layouts[route.meta.layout];
  const PageComponent = route.meta.component;

  return (
    <LayoutComponent currentUser={currentUser}>
      <PageComponent />
    </LayoutComponent>
  );
}
