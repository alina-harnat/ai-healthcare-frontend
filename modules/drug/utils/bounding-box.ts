import type { DetectedObject } from '../types';

const COORDINATE_MAX = 1000;

const clamp = (value: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), COORDINATE_MAX);

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
