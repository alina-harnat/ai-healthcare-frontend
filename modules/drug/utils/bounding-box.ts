import type { DetectedObject } from '../types';

const COORDINATE_MAX = 1000;

const clamp = (value: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), COORDINATE_MAX);

export interface ImagePoint {
  x: number;
  y: number;
}

export interface ImageContentRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ImageBoundingBox {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
}

export const isClientPointWithinRect = (
  clientX: number,
  clientY: number,
  contentRect: ImageContentRect,
): boolean =>
  contentRect.width > 0 &&
  contentRect.height > 0 &&
  clientX >= contentRect.left &&
  clientX <= contentRect.left + contentRect.width &&
  clientY >= contentRect.top &&
  clientY <= contentRect.top + contentRect.height;

export const mapClientPointToImage = (
  clientX: number,
  clientY: number,
  contentRect: ImageContentRect,
  naturalWidth: number,
  naturalHeight: number,
): ImagePoint | null => {
  if (
    contentRect.width <= 0 ||
    contentRect.height <= 0 ||
    naturalWidth <= 0 ||
    naturalHeight <= 0
  ) {
    return null;
  }

  const x = ((clientX - contentRect.left) / contentRect.width) * COORDINATE_MAX;
  const y = ((clientY - contentRect.top) / contentRect.height) * COORDINATE_MAX;

  return {
    x: Math.round(clamp(x)),
    y: Math.round(clamp(y)),
  };
};

export const toImageBoundingBox = (
  first: ImagePoint,
  second: ImagePoint,
): ImageBoundingBox | null => {
  const [xMin, xMax] = [clamp(Math.round(first.x)), clamp(Math.round(second.x))].sort(
    (a, b) => a - b,
  );
  const [yMin, yMax] = [clamp(Math.round(first.y)), clamp(Math.round(second.y))].sort(
    (a, b) => a - b,
  );

  if (xMin === xMax || yMin === yMax) {
    return null;
  }

  return { xMin, yMin, xMax, yMax };
};

export interface BoxPosition {
  label: string;
  left: string;
  top: string;
  width: string;
  height: string;
}

export const toBoxPositions = (objects: DetectedObject[]): BoxPosition[] =>
  objects.flatMap(({ label, boundingBox }) => {
    const [xMin, xMax] = [clamp(boundingBox.xMin), clamp(boundingBox.xMax)].sort(
      (a, b) => a - b,
    );
    const [yMin, yMax] = [clamp(boundingBox.yMin), clamp(boundingBox.yMax)].sort(
      (a, b) => a - b,
    );

    if (xMax === xMin || yMax === yMin) {
      return [];
    }

    return [
      {
        label: label?.trim() || '',
        left: `${xMin / 10}%`,
        top: `${yMin / 10}%`,
        width: `${(xMax - xMin) / 10}%`,
        height: `${(yMax - yMin) / 10}%`,
      },
    ];
  });
