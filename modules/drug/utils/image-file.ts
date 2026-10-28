import { CombinedGraphQLErrors } from '@apollo/client';
import type { MimeType } from '../types';

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp';

const MIME_TYPE_ENUM: Record<string, MimeType> = {
  'image/jpeg': 'Jpeg',
  'image/png': 'Png',
  'image/webp': 'Webp',
};

export const toMimeTypeEnum = (fileType: string): MimeType | null =>
  MIME_TYPE_ENUM[fileType] ?? null;

export type ImageErrorKey =
  | 'imageUpload.unsupportedFile'
  | 'imageUpload.tooLarge'
  | 'imageUpload.readError'
  | 'imageUpload.invalidImage'
  | 'imageUpload.mimeMismatch'
  | 'imageUpload.invalidParameters'
  | 'imageUpload.forbidden'
  | 'imageUpload.unauthenticated'
  | 'imageUpload.tooManyRequests'
  | 'imageUpload.drugNotFound'
  | 'imageUpload.invalidDrugId'
  | 'imageUpload.processingFailed'
  | 'imageUpload.genericError';

const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;

export const isObjectId = (value: string) => OBJECT_ID_PATTERN.test(value);

const matchesBytes = (bytes: Uint8Array, signature: number[], offset = 0) =>
  signature.every((byte, index) => bytes[offset + index] === byte);

const SIGNATURE_CHECKS: Record<MimeType, (bytes: Uint8Array) => boolean> = {
  Jpeg: (bytes) => matchesBytes(bytes, [0xff, 0xd8, 0xff]),
  Png: (bytes) =>
    matchesBytes(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  Webp: (bytes) =>
    matchesBytes(bytes, [0x52, 0x49, 0x46, 0x46]) &&
    matchesBytes(bytes, [0x57, 0x45, 0x42, 0x50], 8),
};

export const hasMatchingSignature = async (
  file: File,
  mimeType: MimeType,
): Promise<boolean> => {
  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());

  return SIGNATURE_CHECKS[mimeType](header);
};

export type ImageFileValidation =
  | { mimeType: MimeType; errorKey?: undefined }
  | { mimeType?: undefined; errorKey: ImageErrorKey };

export const validateImageFile = (file: File): ImageFileValidation => {
  const mimeType = toMimeTypeEnum(file.type);

  if (!mimeType) {
    return { errorKey: 'imageUpload.unsupportedFile' };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return { errorKey: 'imageUpload.tooLarge' };
  }

  return { mimeType };
};

export const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 =
        typeof reader.result === 'string' ? reader.result.split(',')[1] : '';

      if (!base64) {
        reject(new Error('Unable to read image'));
        return;
      }

      resolve(base64);
    };
    reader.onerror = () =>
      reject(reader.error ?? new Error('Unable to read image'));
    reader.readAsDataURL(file);
  });

export const getImageRequestErrorKey = (error: unknown): ImageErrorKey => {
  if (!CombinedGraphQLErrors.is(error)) {
    return 'imageUpload.genericError';
  }

  const [first] = error.errors;
  const message = first?.message ?? '';
  const code = first?.extensions?.code;

  if (message.includes('must not exceed')) return 'imageUpload.tooLarge';
  if (message.includes('valid base64')) return 'imageUpload.invalidImage';
  if (message.includes('does not match the supplied MIME type')) {
    return 'imageUpload.mimeMismatch';
  }
  if (message.includes('Too Many Requests') || code === 'TOO_MANY_REQUESTS') {
    return 'imageUpload.tooManyRequests';
  }
  if (message.includes('was not found') || code === 'NOT_FOUND') {
    return 'imageUpload.drugNotFound';
  }
  if (code === 'FORBIDDEN') return 'imageUpload.forbidden';
  if (code === 'UNAUTHENTICATED') return 'imageUpload.unauthenticated';
  if (code === 'BAD_USER_INPUT' || code === 'BAD_REQUEST') {
    return 'imageUpload.invalidParameters';
  }
  if (code === 'INTERNAL_SERVER_ERROR') return 'imageUpload.processingFailed';

  return 'imageUpload.genericError';
};
