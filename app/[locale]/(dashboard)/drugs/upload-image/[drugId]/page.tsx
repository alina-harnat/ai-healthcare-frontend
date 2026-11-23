import { DrugImageUploadPage } from '../../../../../../modules/drug/pages/upload-image';

interface DrugImageUploadRouteProps {
  params: Promise<{ drugId: string }>;
}

export default async function DrugImageUploadRoute({
  params,
}: DrugImageUploadRouteProps) {
  const { drugId } = await params;

  return <DrugImageUploadPage drugId={drugId} />;
}
