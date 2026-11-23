'use client';

import { useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/core/localization/navigation';
import { CommonRoutes, Permission } from '@/modules/common/enums';
import { useHasPermissions } from '@/modules/common/hooks/use-permissions';
import { useCurrentUser } from '@/modules/user/providers';
import { DrugImageUpload } from '../../components/drug-image-upload';
import { PageContainer, PageHeader } from '../../components/generate-drug-page';
import { DRUG_LOCALE } from '../../constants';
import { DrugRoutes } from '../../enums';

interface DrugImageUploadPageProps {
  drugId: string;
}

export function DrugImageUploadPage({ drugId }: DrugImageUploadPageProps) {
  const t = useTranslations(DRUG_LOCALE);
  const router = useRouter();
  const { loading: userLoading } = useCurrentUser();
  const { hasPermission } = useHasPermissions();
  const isAdmin = hasPermission(Permission.Admin);

  useEffect(() => {
    if (!userLoading && !isAdmin) {
      router.replace(CommonRoutes.Forbidden);
    }
  }, [userLoading, isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <PageContainer>
      <PageHeader>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(DrugRoutes.Drugs)}
          size='small'
        >
          {t('photoUpload.back')}
        </Button>
        <Typography variant='h6'>{t('photoUpload.pageTitle')}</Typography>
      </PageHeader>

      <Card variant='outlined'>
        <CardContent>
          <DrugImageUpload key={drugId} drugId={drugId} />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
