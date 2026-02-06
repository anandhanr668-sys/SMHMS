// src/shared/utils/number.utils.ts

export const clamp = (
  value: number,
  min: number,
  max: number
): number => {
  return Math.min(Math.max(value, min), max);
};

export const round = (
  value: number,
  decimals = 2
): number => {
  if (isNaN(value)) return 0;
  return Number(value.toFixed(decimals));
};
