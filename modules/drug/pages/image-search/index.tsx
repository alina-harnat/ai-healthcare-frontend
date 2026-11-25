"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { Alert, Box, Button, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import { ArrowLeft } from "lucide-react";

import { useRouter } from "@/core/localization/navigation";
import { PageContainer, PageHeader } from "../../components/generate-drug-page";
import { DRUG_LOCALE } from "../../constants";
import { DrugRoutes } from "../../enums";
import { useImageSearch } from "../../hooks";
import {
  HeroUpload,
  ResultsPanel,
  SearchCanvas,
} from "../../components/visual-search";
import { loadImageFileFromUrl } from "../../utils";

const workspaceFadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export function ImageSearchPage() {
  const t = useTranslations(DRUG_LOCALE);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [sourceLoading, setSourceLoading] = useState(false);

  const {
    preview,
    fileErrorKey,
    results,
    boundingBox,
    latencyMs,
    hasMore,
    loading,
    requestErrorKey,
    requestErrorMessage,
    handleFileChange,
    handleBoundingBoxChange,
    handleResetBoundingBox,
    handlePreviewError,
    handleSearch,
    handleLoadMore,
  } = useImageSearch();

  const busy = loading || sourceLoading;

  const handleUseAsQuery = async (imageUrl: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSourceLoading(true);
    setSourceError(null);

    try {
      handleFileChange(await loadImageFileFromUrl(imageUrl));
    } catch {
      setSourceError(t("imageSearch.queryLoadFailed"));
    } finally {
      setSourceLoading(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files?.[0]);
    event.target.value = "";
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const pasted = Array.from(event.clipboardData?.items ?? [])
        .find((item) => item.kind === "file" && item.type.startsWith("image/"))
        ?.getAsFile();

      if (!pasted || busy) return;

      event.preventDefault();
      handleFileChange(pasted);
    };

    window.addEventListener("paste", handlePaste);

    return () => window.removeEventListener("paste", handlePaste);
  }, [busy, handleFileChange]);

  const errorMessages = [
    fileErrorKey ? t(fileErrorKey) : null,
    sourceError,
    requestErrorKey
      ? requestErrorKey === "imageUpload.genericError" && requestErrorMessage
        ? requestErrorMessage
        : t(requestErrorKey)
      : null,
  ].filter((message): message is string => !!message);

  const openFilePicker = () => fileInputRef.current?.click();

  return (
    <PageContainer sx={{ maxWidth: 1280 }}>
      <PageHeader>
        <Button
          startIcon={<ArrowLeft size={16} aria-hidden />}
          onClick={() => router.push(DrugRoutes.Drugs)}
          size="small"
        >
          {t("imageSearch.back")}
        </Button>
        <Typography variant="h6" component="h1">
          {t("imageSearch.title")}
        </Typography>
      </PageHeader>

      {errorMessages.length > 0 && (
        <Alert severity="error">
          {errorMessages.map((message) => (
            <Box key={message}>{message}</Box>
          ))}
        </Alert>
      )}

      {preview ? (
        <Box
          sx={{
            display: "grid",
            alignItems: "start",
            gap: 3,
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              lg: "minmax(0, 11fr) minmax(0, 9fr)",
            },
            animation: `${workspaceFadeIn} 360ms ease-out both`,
          }}
        >
          <SearchCanvas
            src={preview}
            boundingBox={boundingBox}
            loading={loading}
            onBoundingBoxChange={handleBoundingBoxChange}
            onImageError={handlePreviewError}
            onResetCrop={handleResetBoundingBox}
            onUploadNew={openFilePicker}
            onSearch={handleSearch}
          />
          <ResultsPanel
            results={results}
            latencyMs={latencyMs}
            hasMore={hasMore}
            loading={loading}
            onLoadMore={handleLoadMore}
            onUseAsQuery={handleUseAsQuery}
            onViewRecord={() => router.push(DrugRoutes.Drugs)}
          />
        </Box>
      ) : (
        <HeroUpload
          loading={busy}
          onBrowse={openFilePicker}
          onFileDrop={handleFileChange}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label={t("imageSearch.chooseFile")}
        hidden
        onChange={handleInputChange}
      />
    </PageContainer>
  );
}
