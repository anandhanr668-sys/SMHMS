// src/shared/utils/date.utils.ts

export const formatDate = (
  date: string | Date,
  locale = "en-IN"
): string => {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export const formatDateTime = (
  date: string | Date,
  locale = "en-IN"
): string => {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
