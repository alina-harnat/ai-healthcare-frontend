import { useMemo, useState } from 'react';

import { drugApi } from '../api';
import type { DetectedObject } from '../types';
import {
  getImageRequestErrorKey,
  readFileAsBase64,
  toBoxPositions,
  type ImageErrorKey,
} from '../utils';
import { useImageFile } from './use-image-file';

export const useObjectDetection = () => {
  const imageFile = useImageFile();
  const { file, mimeType, setFileErrorKey } = imageFile;

  const [objects, setObjects] = useState<DetectedObject[] | null>(null);
  const [requestErrorKey, setRequestErrorKey] = useState<ImageErrorKey | null>(
    null,
  );

  const [detectObjects, { loading }] = drugApi.useDetectObjectsMutation();

  const boxes = useMemo(() => toBoxPositions(objects ?? []), [objects]);

  const handleFileChange = (selected?: File) => {
    setObjects(null);
    setRequestErrorKey(null);
    imageFile.selectFile(selected);
  };

  const handleDetect = async () => {
    if (!file || !mimeType || loading) return;

    setRequestErrorKey(null);

    let image: string;

    try {
      image = await readFileAsBase64(file);
    } catch {
      setFileErrorKey('imageUpload.readError');
      return;
    }

    try {
      const { data } = await detectObjects({
        variables: { input: { image, mimeType } },
      });

      setObjects(data?.detectObjects.objects ?? []);
    } catch (error) {
      setRequestErrorKey(getImageRequestErrorKey(error));
    }
  };

  return {
    ...imageFile,
    objects,
    boxes,
    loading,
    requestErrorKey,
    handleFileChange,
    handleDetect,
  };
};
