import { useRef, useState } from 'react';

import { drugApi } from '../api';
import type { BoundingBox, MimeType, SimilarDrugImage } from '../types';
import {
  getGraphQLErrorMessage,
  getImageRequestErrorKey,
  hasMatchingSignature,
  readFileAsBase64,
  type ImageErrorKey,
} from '../utils';
import { useImageFile } from './use-image-file';

export const IMAGE_SEARCH_PAGE_SIZE = 20;

export const DEFAULT_CROP_BOX: BoundingBox = {
  xMin: 150,
  yMin: 150,
  xMax: 850,
  yMax: 850,
};

interface SearchSource {
  image: string;
  mimeType: MimeType;
  boundingBox: BoundingBox;
}

export const useImageSearch = () => {
  const imageFile = useImageFile();
  const { file, mimeType, setFileErrorKey } = imageFile;

  const [source, setSource] = useState<SearchSource | null>(null);
  const [results, setResults] = useState<SimilarDrugImage[] | null>(null);
  const [boundingBox, setBoundingBox] = useState<BoundingBox>(DEFAULT_CROP_BOX);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [nextOffset, setNextOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [requestErrorKey, setRequestErrorKey] = useState<ImageErrorKey | null>(
    null,
  );
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null,
  );
  const [preparing, setPreparing] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const operationInProgress = useRef(false);

  const [searchSimilarDrugImages, { loading: querying }] =
    drugApi.useSearchSimilarDrugImagesLazyQuery();

  const loading = preparing || querying;

  const clearSearchState = () => {
    setSource(null);
    setResults(null);
    setLatencyMs(null);
    setNextOffset(0);
    setHasMore(false);
    setRequestErrorKey(null);
    setRequestErrorMessage(null);
  };

  const runSearch = async (searchSource: SearchSource, offset: number) => {
    setRequestErrorKey(null);
    setRequestErrorMessage(null);
    const startedAt = performance.now();

    try {
      const { data, error } = await searchSimilarDrugImages({
        variables: {
          input: {
            ...searchSource,
            limit: IMAGE_SEARCH_PAGE_SIZE,
            offset,
          },
        },
      });

      if (error) throw error;

      const page = data?.searchSimilarDrugImages;

      if (!page) throw new Error('Image search returned no result');

      if (offset === 0) {
        setLatencyMs(performance.now() - startedAt);
      }
      setResults((previous) =>
        offset === 0 ? page.images : [...(previous ?? []), ...page.images],
      );
      const followingOffset = page.offset + page.limit;
      setNextOffset(followingOffset);
      setHasMore(page.hasMore && followingOffset <= 1000);
    } catch (error) {
      setRequestErrorKey(getImageRequestErrorKey(error));
      setRequestErrorMessage(getGraphQLErrorMessage(error));
    }
  };

  const handleFileChange = (selected?: File) => {
    if (!selected) return;

    clearSearchState();
    setBoundingBox(DEFAULT_CROP_BOX);
    setPreviewFailed(false);
    imageFile.selectFile(selected);
  };

  const handleClearSelection = () => {
    if (loading) return;

    clearSearchState();
    setBoundingBox(DEFAULT_CROP_BOX);
    setPreviewFailed(false);
    imageFile.clearFile();
  };

  const handleBoundingBoxChange = (box: BoundingBox) => {
    setBoundingBox(box);
    clearSearchState();
  };

  const handleResetBoundingBox = () => {
    if (loading) return;

    setBoundingBox(DEFAULT_CROP_BOX);
    clearSearchState();
  };

  const handlePreviewError = () => {
    setPreviewFailed(true);
    setFileErrorKey('imageUpload.invalidImage');
    clearSearchState();
  };

  const handleSearch = async () => {
    if (
      !file ||
      !mimeType ||
      previewFailed ||
      loading ||
      operationInProgress.current
    ) {
      return;
    }

    operationInProgress.current = true;
    setPreparing(true);
    clearSearchState();

    try {
      if (!(await hasMatchingSignature(file, mimeType))) {
        setFileErrorKey('imageUpload.mimeMismatch');
        return;
      }

      const image = await readFileAsBase64(file);
      const searchSource: SearchSource = {
        image,
        mimeType,
        boundingBox,
      };

      setSource(searchSource);
      setPreparing(false);
      await runSearch(searchSource, 0);
    } catch {
      setFileErrorKey('imageUpload.readError');
    } finally {
      operationInProgress.current = false;
      setPreparing(false);
    }
  };

  const handleLoadMore = async () => {
    if (!source || !hasMore || loading || operationInProgress.current) {
      return;
    }

    operationInProgress.current = true;
    try {
      await runSearch(source, nextOffset);
    } finally {
      operationInProgress.current = false;
    }
  };

  return {
    ...imageFile,
    results,
    boundingBox,
    latencyMs,
    hasMore,
    loading,
    requestErrorKey,
    requestErrorMessage,
    previewFailed,
    handleFileChange,
    handleClearSelection,
    handleBoundingBoxChange,
    handleResetBoundingBox,
    handlePreviewError,
    handleSearch,
    handleLoadMore,
  };
};
