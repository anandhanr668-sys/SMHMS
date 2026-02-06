// src/shared/utils/currency.utils.ts

export const formatCurrency = (
  amount: number,
  currency: "INR" | "USD" = "INR",
  locale = "en-IN"
): string => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "₹0";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(amount);
};
