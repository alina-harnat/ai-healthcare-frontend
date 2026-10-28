import { useEffect, useState } from 'react';

import type { MimeType } from '../types';
import { validateImageFile, type ImageErrorKey } from '../utils';

export const useImageFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mimeType, setMimeType] = useState<MimeType | null>(null);
  const [preview, setPreview] = useState('');
  const [fileErrorKey, setFileErrorKey] = useState<ImageErrorKey | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const selectFile = (selected?: File) => {
    setFileErrorKey(null);

    if (!selected) return false;

    const validation = validateImageFile(selected);

    if (validation.errorKey) {
      setFile(null);
      setMimeType(null);
      setPreview('');
      setFileErrorKey(validation.errorKey);
      return false;
    }

    setFile(selected);
    setMimeType(validation.mimeType);
    setPreview(URL.createObjectURL(selected));
    return true;
  };

  const clearFile = () => {
    setFile(null);
    setMimeType(null);
    setPreview('');
    setFileErrorKey(null);
  };

  return {
    file,
    clearFile,
    mimeType,
    preview,
    fileErrorKey,
    setFileErrorKey,
    selectFile,
  };
};
