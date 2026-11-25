"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { Box } from "@mui/material";
import { alpha, keyframes } from "@mui/material/styles";

import type { BoundingBox } from "../../types";
import {
  isClientPointWithinRect,
  mapClientPointToImage,
  toImageBoundingBox,
  type ImagePoint,
} from "../../utils";

interface ImageRegionSelectorProps {
  src: string;
  alt: string;
  instructions: string;
  scanning?: boolean;
  value: BoundingBox;
  disabled?: boolean;
  maxHeight?: string | Record<string, string>;
  onChange: (value: BoundingBox) => void;
  onImageError: () => void;
}

interface Handle {
  id: string;
  horizontal?: "w" | "e";
  vertical?: "n" | "s";
}

const COORDINATE_MAX = 1000;
const MIN_SIZE = 40;
const STEP = 10;
const LARGE_STEP = 50;

const BOTTOM_RIGHT: Handle = { id: "se", horizontal: "e", vertical: "s" };

const HANDLES: Handle[] = [
  { id: "nw", horizontal: "w", vertical: "n" },
  { id: "n", vertical: "n" },
  { id: "ne", horizontal: "e", vertical: "n" },
  { id: "e", horizontal: "e" },
  BOTTOM_RIGHT,
  { id: "s", vertical: "s" },
  { id: "sw", horizontal: "w", vertical: "s" },
  { id: "w", horizontal: "w" },
];

const CURSORS: Record<string, string> = {
  nw: "nwse-resize",
  se: "nwse-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
};

type HandleStyles = Record<string, number | string>;

const CORNER_BORDERS: Record<string, HandleStyles> = {
  nw: { borderLeftWidth: 3, borderTopWidth: 3, borderTopLeftRadius: 6 },
  ne: { borderRightWidth: 3, borderTopWidth: 3, borderTopRightRadius: 6 },
  se: { borderRightWidth: 3, borderBottomWidth: 3, borderBottomRightRadius: 6 },
  sw: { borderLeftWidth: 3, borderBottomWidth: 3, borderBottomLeftRadius: 6 },
};

const RULE_OF_THIRDS = [
  { id: "x1", axis: "x", position: "33.333%" },
  { id: "x2", axis: "x", position: "66.666%" },
  { id: "y1", axis: "y", position: "33.333%" },
  { id: "y2", axis: "y", position: "66.666%" },
] as const;

const scanLine = keyframes`
  from { top: -56px; }
  to { top: 100%; }
`;

type DragState =
  | { type: "create"; start: ImagePoint }
  | { type: "move"; start: ImagePoint; origin: BoundingBox }
  | { type: "resize"; handle: Handle; origin: BoundingBox };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const percent = (value: number) => `${value / 10}%`;

const isSameBox = (a: BoundingBox, b: BoundingBox) =>
  a.xMin === b.xMin &&
  a.yMin === b.yMin &&
  a.xMax === b.xMax &&
  a.yMax === b.yMax;

const moveBox = (origin: BoundingBox, dx: number, dy: number): BoundingBox => {
  const width = origin.xMax - origin.xMin;
  const height = origin.yMax - origin.yMin;
  const xMin = clamp(origin.xMin + dx, 0, COORDINATE_MAX - width);
  const yMin = clamp(origin.yMin + dy, 0, COORDINATE_MAX - height);

  return { xMin, yMin, xMax: xMin + width, yMax: yMin + height };
};

const resizeBox = (
  origin: BoundingBox,
  handle: Handle,
  point: ImagePoint,
): BoundingBox => {
  const next = { ...origin };

  if (handle.horizontal === "w") {
    next.xMin = clamp(point.x, 0, origin.xMax - MIN_SIZE);
  }
  if (handle.horizontal === "e") {
    next.xMax = clamp(point.x, origin.xMin + MIN_SIZE, COORDINATE_MAX);
  }
  if (handle.vertical === "n") {
    next.yMin = clamp(point.y, 0, origin.yMax - MIN_SIZE);
  }
  if (handle.vertical === "s") {
    next.yMax = clamp(point.y, origin.yMin + MIN_SIZE, COORDINATE_MAX);
  }

  return next;
};

const getHandlePlacement = (handle: Handle) => ({
  left:
    handle.horizontal === "w"
      ? "0%"
      : handle.horizontal === "e"
        ? "100%"
        : "50%",
  top:
    handle.vertical === "n" ? "0%" : handle.vertical === "s" ? "100%" : "50%",
});

const getHandleSx = (handle: Handle): HandleStyles => {
  const base: HandleStyles = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.25)",
  };

  if (handle.horizontal && handle.vertical) {
    return {
      ...base,
      width: 18,
      height: 18,
      borderStyle: "solid",
      borderColor: "common.white",
      borderWidth: 0,
      boxShadow: "none",
      filter: "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.45))",
      ...CORNER_BORDERS[handle.id],
    };
  }

  return {
    ...base,
    bgcolor: "common.white",
    borderRadius: 999,
    width: handle.vertical ? 26 : 6,
    height: handle.vertical ? 6 : 26,
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.35)",
  };
};

export function ImageRegionSelector({
  src,
  alt,
  instructions,
  scanning = false,
  value,
  disabled = false,
  maxHeight = "62vh",
  onChange,
  onImageError,
}: ImageRegionSelectorProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const draftRef = useRef<BoundingBox | null>(null);
  const [draft, setDraft] = useState<BoundingBox | null>(null);

  const updateDraft = (box: BoundingBox | null) => {
    draftRef.current = box;
    setDraft(box);
  };

  const getPoint = (clientX: number, clientY: number) => {
    const image = imageRef.current;
    if (!image) return null;

    const rect = image.getBoundingClientRect();

    return mapClientPointToImage(
      clientX,
      clientY,
      {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
      image.naturalWidth,
      image.naturalHeight,
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || !event.isPrimary || event.button !== 0) return;

    const image = imageRef.current;
    if (!image) return;

    const rect = image.getBoundingClientRect();
    const contentRect = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    if (!isClientPointWithinRect(event.clientX, event.clientY, contentRect)) {
      return;
    }

    const point = getPoint(event.clientX, event.clientY);
    if (!point) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const target = event.target as HTMLElement;
    const handleId =
      target.closest<HTMLElement>("[data-handle]")?.dataset.handle;
    const handle = HANDLES.find((item) => item.id === handleId);

    if (handle) {
      dragRef.current = { type: "resize", handle, origin: value };
      updateDraft(value);
    } else if (target.closest("[data-crop-box]")) {
      dragRef.current = { type: "move", start: point, origin: value };
      updateDraft(value);
    } else {
      dragRef.current = { type: "create", start: point };
      updateDraft(null);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (disabled || !drag) return;

    const point = getPoint(event.clientX, event.clientY);
    if (!point) return;

    if (drag.type === "create") {
      updateDraft(toImageBoundingBox(drag.start, point));
    } else if (drag.type === "move") {
      updateDraft(
        moveBox(drag.origin, point.x - drag.start.x, point.y - drag.start.y),
      );
    } else {
      updateDraft(resizeBox(drag.origin, drag.handle, point));
    }
  };

  const endDrag = (commit: boolean) => {
    const committed = draftRef.current;
    dragRef.current = null;
    updateDraft(null);

    if (commit && committed && !isSameBox(committed, value)) {
      onChange(committed);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    const dx =
      event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
    const dy = event.key === "ArrowUp" ? -1 : event.key === "ArrowDown" ? 1 : 0;
    if (!dx && !dy) return;

    event.preventDefault();
    const amount = event.shiftKey ? LARGE_STEP : STEP;

    if (event.altKey) {
      onChange(
        resizeBox(value, BOTTOM_RIGHT, {
          x: value.xMax + dx * amount,
          y: value.yMax + dy * amount,
        }),
      );
      return;
    }

    onChange(moveBox(value, dx * amount, dy * amount));
  };

  const box = draft ?? value;

  return (
    <Box
      role="group"
      tabIndex={disabled ? -1 : 0}
      aria-label={`${alt}. ${instructions}`}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => endDrag(true)}
      onPointerCancel={() => endDrag(false)}
      sx={{
        position: "relative",
        display: "inline-block",
        maxWidth: "100%",
        touchAction: "none",
        userSelect: "none",
        overflow: "hidden",
        borderRadius: 1,
        lineHeight: 0,
        outline: "none",
        cursor: disabled ? "default" : "crosshair",
        "&:focus-visible": {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
        },
      }}
    >
      <Box
        component="img"
        ref={imageRef}
        src={src}
        alt={alt}
        draggable={false}
        onError={onImageError}
        sx={{
          display: "block",
          height: "auto",
          width: "auto",
          maxWidth: "100%",
          maxHeight,
        }}
      />
      <Box
        data-crop-box
        sx={{
          position: "absolute",
          cursor: "move",
          border: "1.5px solid",
          borderColor: (theme) => alpha(theme.palette.common.white, 0.95),
          borderRadius: 0.5,
          boxShadow: (theme) =>
            `0 0 0 9999px ${alpha(theme.palette.text.primary, 0.6)}, 0 0 28px ${alpha(theme.palette.primary.main, 0.45)}`,
        }}
        style={{
          left: percent(box.xMin),
          top: percent(box.yMin),
          width: percent(box.xMax - box.xMin),
          height: percent(box.yMax - box.yMin),
        }}
      >
        {RULE_OF_THIRDS.map((guide) => (
          <Box
            key={guide.id}
            aria-hidden="true"
            sx={{
              pointerEvents: "none",
              position: "absolute",
              opacity: draft ? 1 : 0,
              transition: "opacity 200ms ease",
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.45),
              ...(guide.axis === "x"
                ? { top: 0, bottom: 0, width: "1px", left: guide.position }
                : { left: 0, right: 0, height: "1px", top: guide.position }),
            }}
          />
        ))}
        {scanning && (
          <Box
            aria-hidden="true"
            sx={{
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 56,
                background: (theme) =>
                  `linear-gradient(to bottom, transparent, ${alpha(theme.palette.primary.main, 0.45)} 70%, ${alpha(theme.palette.primary.main, 0.9)})`,
                borderBottom: "2px solid",
                borderColor: "primary.main",
                animation: `${scanLine} 1.8s ease-in-out infinite alternate`,
              }}
            />
          </Box>
        )}
        {!disabled &&
          HANDLES.map((handle) => (
            <Box
              key={handle.id}
              data-handle={handle.id}
              aria-hidden="true"
              sx={{
                ...getHandleSx(handle),
                ...getHandlePlacement(handle),
                cursor: CURSORS[handle.id],
              }}
            />
          ))}
      </Box>
    </Box>
  );
}
