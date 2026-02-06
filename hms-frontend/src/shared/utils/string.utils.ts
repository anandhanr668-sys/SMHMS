// src/shared/utils/string.utils.ts

export const capitalize = (value: string): string => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const toTitleCase = (value: string): string => {
  if (!value) return "";
  return value
    .toLowerCase()
    .split(" ")
    .map((w) => capitalize(w))
    .join(" ");
};

export const truncate = (
  value: string,
  maxLength = 30
): string => {
  if (!value) return "";
  return value.length > maxLength
    ? value.slice(0, maxLength) + "…"
    : value;
};
