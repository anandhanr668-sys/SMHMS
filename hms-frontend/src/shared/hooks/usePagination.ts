// src/shared/hooks/usePagination.ts

import { useState } from "react";

export const usePagination = (
  totalItems: number,
  pageSize = 10
) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const next = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  const prev = () => {
    setPage((p) => Math.max(p - 1, 1));
  };

  const reset = () => setPage(1);

  return {
    page,
    pageSize,
    totalPages,
    next,
    prev,
    reset
  };
};
