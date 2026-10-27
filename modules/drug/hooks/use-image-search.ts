import { useState } from 'react';

import { drugApi } from '../api';
import type { MimeType, SimilarDrugImage } from '../types';
import {
  getImageRequestErrorKey,
  readFileAsBase64,
  type ImageErrorKey,
} from '../utils';
import { useImageFile } from './use-image-file';

export const IMAGE_SEARCH_PAGE_SIZE = 20;
export const DEFAULT_MIN_SIMILARITY_SCORE = 0.75;

interface SearchSource {
  image: string;
  mimeType: MimeType;
  minSimilarityScore: number;
}

export const useImageSearch = () => {
  const imageFile = useImageFile();
  const { file, mimeType, setFileErrorKey } = imageFile;

  const [minSimilarityScore, setMinSimilarityScore] = useState(
    DEFAULT_MIN_SIMILARITY_SCORE,
  );
  const [source, setSource] = useState<SearchSource | null>(null);
  const [results, setResults] = useState<SimilarDrugImage[] | null>(null);
  const [nextOffset, setNextOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [requestErrorKey, setRequestErrorKey] = useState<ImageErrorKey | null>(
    null,
  );

  const [searchSimilarDrugImages, { loading }] =
    drugApi.useSearchSimilarDrugImagesLazyQuery();

  const runSearch = async (searchSource: SearchSource, offset: number) => {
    setRequestErrorKey(null);

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

      if (!page) return;

      setResults((previous) =>
        offset === 0 ? page.images : [...(previous ?? []), ...page.images],
      );
      setNextOffset(page.offset + page.limit);
      setHasMore(page.hasMore);
    } catch (error) {
      setRequestErrorKey(getImageRequestErrorKey(error));
    }
  };

  const handleFileChange = (selected?: File) => {
    setResults(null);
    setSource(null);
    setHasMore(false);
    setRequestErrorKey(null);
    imageFile.selectFile(selected);
  };

  const handleSearch = async () => {
    if (!file || !mimeType || loading) return;

    let image: string;

    try {
      image = await readFileAsBase64(file);
    } catch {
      setFileErrorKey('imageUpload.readError');
      return;
    }

    const searchSource = { image, mimeType, minSimilarityScore };

    setSource(searchSource);
    await runSearch(searchSource, 0);
  };

  const handleLoadMore = async () => {
    if (!source || !hasMore || loading) return;

    await runSearch(source, nextOffset);
  };

  return {
    ...imageFile,
    minSimilarityScore,
    setMinSimilarityScore,
    results,
    hasMore,
    loading,
    requestErrorKey,
    handleFileChange,
    handleSearch,
    handleLoadMore,
  };
};
