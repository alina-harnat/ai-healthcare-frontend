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
  | 'imageUpload.networkError'
  | 'imageUpload.genericError';

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

  if (!file.size) {
    return { errorKey: 'imageUpload.invalidImage' };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return { errorKey: 'imageUpload.tooLarge' };
  }

  return { mimeType };
};

const DATA_URL_BASE64 = /^data:[^;]+;base64,(.+)$/;

export const toRawBase64 = (value: string): string | null => {
  const encoded = value.match(DATA_URL_BASE64)?.[1] ?? value;

  if (!encoded || encoded.startsWith('data:')) {
    return null;
  }

  return encoded;
};

export const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 =
        typeof reader.result === 'string' ? toRawBase64(reader.result) : null;

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

export const loadImageFileFromUrl = async (url: string): Promise<File> => {
  const parsed = new URL(url);

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('Unsupported image URL');
  }

  const response = await fetch(parsed.href, { mode: 'cors' });

  if (!response.ok) {
    throw new Error(`Unable to load image: ${response.status}`);
  }

  const blob = await response.blob();
  const name = parsed.pathname.split('/').pop() || 'image';
  const file = new File([blob], name, { type: blob.type });
  const validation = validateImageFile(file);

  if (validation.errorKey) {
    throw new Error(validation.errorKey);
  }

  return file;
};

interface GraphQLErrorLike {
  message?: string;
  extensions?: { code?: unknown };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toGraphQLErrors = (error: unknown): readonly GraphQLErrorLike[] => {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors;
  }

  if (!isRecord(error)) {
    return [];
  }

  if (Array.isArray(error.errors)) {
    return error.errors as GraphQLErrorLike[];
  }

  if (Array.isArray(error.graphQLErrors)) {
    return error.graphQLErrors as GraphQLErrorLike[];
  }

  if ('cause' in error) {
    return toGraphQLErrors(error.cause);
  }

  return [];
};

export const getGraphQLErrorMessage = (error: unknown): string | null => {
  for (const graphQLError of toGraphQLErrors(error)) {
    const message = graphQLError.message?.split('\n', 1)[0].trim();

    if (message) {
      return message.slice(0, 300);
    }
  }

  return null;
};

const getStatusCode = (error: unknown): number | undefined => {
  if (!isRecord(error)) return undefined;

  if (typeof error.statusCode === 'number') return error.statusCode;
  if (typeof error.status === 'number') return error.status;

  return undefined;
};

export const getImageRequestErrorKey = (error: unknown): ImageErrorKey => {
  const statusCode = getStatusCode(error);

  if (statusCode === 401) return 'imageUpload.unauthenticated';
  if (statusCode === 403) return 'imageUpload.forbidden';
  if (statusCode === 429) return 'imageUpload.tooManyRequests';
  if (statusCode === 404) return 'imageUpload.drugNotFound';
  if (statusCode !== undefined && statusCode >= 500) {
    return 'imageUpload.processingFailed';
  }

  const graphQLErrors = toGraphQLErrors(error);

  if (!graphQLErrors.length) {
    const message = error instanceof Error ? error.message : '';

    if (
      error instanceof TypeError ||
      /network|fetch|failed to fetch/i.test(message)
    ) {
      return 'imageUpload.networkError';
    }

    return 'imageUpload.genericError';
  }

  for (const graphQLError of graphQLErrors) {
    const message = graphQLError.message?.toLowerCase() ?? '';
    const code = graphQLError.extensions?.code;

    if (message.includes('must not exceed')) return 'imageUpload.tooLarge';
    if (
      message.includes('valid base64') ||
      message.includes('must not be empty') ||
      message.includes('cannot be empty')
    ) {
      return 'imageUpload.invalidImage';
    }
    if (message.includes('does not match the supplied mime type')) {
      return 'imageUpload.mimeMismatch';
    }
    if (
      message.includes('too many requests') ||
      code === 'TOO_MANY_REQUESTS'
    ) {
      return 'imageUpload.tooManyRequests';
    }
    if (
      message.includes('invalid drug id') ||
      (message.includes('invalid') && message.includes('drug'))
    ) {
      return 'imageUpload.invalidDrugId';
    }
    if (
      code === 'NOT_FOUND' ||
      (message.includes('drug') &&
        (message.includes('not found') || message.includes('does not exist')))
    ) {
      return 'imageUpload.drugNotFound';
    }
    if (
      code === 'FORBIDDEN' ||
      message === 'forbidden' ||
      message.includes('not allowed') ||
      message.includes('access denied')
    ) {
      return 'imageUpload.forbidden';
    }
    if (
      code === 'UNAUTHENTICATED' ||
      message === 'unauthorized' ||
      message.includes('not authenticated')
    ) {
      return 'imageUpload.unauthenticated';
    }
    if (code === 'BAD_USER_INPUT' || code === 'BAD_REQUEST') {
      return message.includes('drug')
        ? 'imageUpload.drugNotFound'
        : 'imageUpload.invalidParameters';
    }
    if (
      code === 'INTERNAL_SERVER_ERROR' ||
      code === 'PROCESSING_FAILED' ||
      code === 'STORAGE_ERROR' ||
      message.includes('processing failed') ||
      message.includes('processing error') ||
      message.includes('storage failed') ||
      message.includes('storage error') ||
      message.includes('upload failed') ||
      message.includes('failed to store')
    ) {
      return 'imageUpload.processingFailed';
    }
  }

  return 'imageUpload.genericError';
};
