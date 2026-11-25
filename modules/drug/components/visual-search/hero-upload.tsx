"use client";

import { useState } from "react";
import type { DragEvent } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { ClipboardPaste, Upload } from "lucide-react";

import { DRUG_LOCALE } from "../../constants";

interface HeroUploadProps {
  loading: boolean;
  onBrowse: () => void;
  onFileDrop: (file: File) => void;
}

export function HeroUpload({ loading, onBrowse, onFileDrop }: HeroUploadProps) {
  const t = useTranslations(DRUG_LOCALE);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];

    if (!loading && file) onFileDrop(file);
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2.5,
        width: "100%",
        maxWidth: 720,
        minHeight: 320,
        px: 3,
        py: 6,
        textAlign: "center",
        borderRadius: 1,
        border: "1px dashed",
        borderColor: dragging ? "primary.main" : "divider",
        bgcolor: dragging
          ? (theme) => alpha(theme.palette.primary.main, 0.06)
          : "background.paper",
        boxShadow: dragging ? 3 : 1,
        transition:
          "border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease",
        "&:hover": { borderColor: "primary.light" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: 1,
          color: "primary.main",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
        }}
      >
        <Upload size={24} aria-hidden />
      </Box>

      <Typography variant="h6">{t("imageSearch.dropTitle")}</Typography>

      <Button
        variant="contained"
        onClick={onBrowse}
        disabled={loading}
        startIcon={<Upload size={16} aria-hidden />}
      >
        {t("imageSearch.chooseFile")}
      </Button>

      <Chip
        size="small"
        variant="outlined"
        icon={<ClipboardPaste size={14} aria-hidden />}
        label={t("imageSearch.pasteShortcut")}
        sx={{ color: "text.secondary" }}
      />
    </Box>
  );
}
