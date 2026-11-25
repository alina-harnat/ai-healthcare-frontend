"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Box, Button, CircularProgress } from "@mui/material";
import { ImagePlus, RotateCcw, Search } from "lucide-react";

import { DRUG_LOCALE } from "../../constants";
import type { BoundingBox } from "../../types";
import { ImageRegionSelector } from "../image-region-selector";

const INTERACTIVE_SELECTOR =
  "button, a, input, textarea, select, [contenteditable='true']";

interface SearchCanvasProps {
  src: string;
  boundingBox: BoundingBox;
  loading: boolean;
  onBoundingBoxChange: (box: BoundingBox) => void;
  onImageError: () => void;
  onResetCrop: () => void;
  onUploadNew: () => void;
  onSearch: () => void;
}

export function SearchCanvas({
  src,
  boundingBox,
  loading,
  onBoundingBoxChange,
  onImageError,
  onResetCrop,
  onUploadNew,
  onSearch,
}: SearchCanvasProps) {
  const t = useTranslations(DRUG_LOCALE);

  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.repeat || loading) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest(INTERACTIVE_SELECTOR)
      ) {
        return;
      }

      event.preventDefault();
      onSearch();
    };

    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [loading, onSearch]);

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 0,
        position: { lg: "sticky" },
        top: { lg: 24 },
        alignSelf: { lg: "start" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
          minHeight: { xs: 360, lg: 540 },
          height: { lg: "calc(100vh - 180px)" },
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.default",
          boxShadow: 1,
          overflow: "hidden",
        }}
      >
        <ImageRegionSelector
          src={src}
          alt={t("imageSearch.previewAlt")}
          instructions={t("imageSearch.regionInstructions")}
          scanning={loading}
          value={boundingBox}
          disabled={loading}
          maxHeight={{ xs: "62vh", lg: "calc(100vh - 200px)" }}
          onChange={onBoundingBoxChange}
          onImageError={onImageError}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: 1,
        }}
      >
        <Button
          variant="text"
          color="inherit"
          size="small"
          onClick={onResetCrop}
          disabled={loading}
          startIcon={<RotateCcw size={16} aria-hidden />}
          sx={{ color: "text.secondary", flexShrink: 0 }}
        >
          {t("imageSearch.resetCrop")}
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={onUploadNew}
          disabled={loading}
          startIcon={<ImagePlus size={16} aria-hidden />}
          sx={{ flexShrink: 0 }}
        >
          {t("imageSearch.uploadNew")}
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={onSearch}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <Search size={18} aria-hidden />
            )
          }
          sx={{
            ml: { sm: "auto" },
            flexGrow: { xs: 1, sm: 0 },
            whiteSpace: "nowrap",
          }}
        >
          {loading ? t("imageSearch.searching") : t("imageSearch.searchCta")}
        </Button>
      </Box>
    </Box>
  );
}
