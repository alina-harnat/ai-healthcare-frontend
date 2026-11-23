import { useEffect, useState } from 'react';

import { drugApi } from '../api';
import type { DrugImage } from '../types';
import {
  getImageRequestErrorKey,
  hasMatchingSignature,
  readFileAsBase64,
  type ImageErrorKey,
} from '../utils';
import { useImageFile } from './use-image-file';

export const SIGNED_URL_TTL_MS = 3600 * 1000;

export interface UploadedDrugImage extends DrugImage {
  expiresAt: number;
}

export const useDrugImageUpload = (drugId?: string) => {
  const imageFile = useImageFile();
  const { file, mimeType, setFileErrorKey } = imageFile;

  const [uploadedImage, setUploadedImage] = useState<UploadedDrugImage | null>(
    null,
  );
  const [requestErrorKey, setRequestErrorKey] = useState<ImageErrorKey | null>(
    null,
  );
  const [preparing, setPreparing] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const [uploadDrugImage, { loading: uploading }] =
    drugApi.useUploadDrugImageMutation();

  useEffect(() => {
    if (!uploadedImage) return;

    const timer = setInterval(() => setNow(Date.now()), 60 * 1000);

    return () => clearInterval(timer);
  }, [uploadedImage]);

  const loading = preparing || uploading;

  const handleFileChange = (selected?: File) => {
    setRequestErrorKey(null);
    imageFile.selectFile(selected);
  };

  const handleClearSelection = () => {
    if (loading) return;

    setRequestErrorKey(null);
    imageFile.clearFile();
  };

  const handleUpload = async () => {
    if (!file || !mimeType || loading) return;

    setRequestErrorKey(null);

    if (!drugId?.trim()) {
      setRequestErrorKey('imageUpload.invalidDrugId');
      return;
    }

    let image: string;
    setPreparing(true);

    try {
      if (!(await hasMatchingSignature(file, mimeType))) {
        setFileErrorKey('imageUpload.mimeMismatch');
        return;
      }

      image = await readFileAsBase64(file);
    } catch {
      setFileErrorKey('imageUpload.readError');
      return;
    } finally {
      setPreparing(false);
    }

    try {
      const { data, error } = await uploadDrugImage({
        variables: { input: { drugId, image, mimeType } },
      });

      if (error) throw error;

      const uploaded = data?.uploadDrugImage;

      if (!uploaded) {
        setRequestErrorKey('imageUpload.genericError');
        return;
      }

      const uploadedAt = Date.now();
      setNow(uploadedAt);
      setUploadedImage({
        ...uploaded,
        expiresAt: uploadedAt + SIGNED_URL_TTL_MS,
      });
      imageFile.clearFile();
    } catch (error) {
      setRequestErrorKey(getImageRequestErrorKey(error));
    }
  };

  return {
    ...imageFile,
    uploadedImage,
    now,
    loading,
    requestErrorKey,
    handleFileChange,
    handleClearSelection,
    handleUpload,
  };
};
