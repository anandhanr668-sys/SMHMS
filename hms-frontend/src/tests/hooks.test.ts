// src/tests/hooks.test.ts

import { renderHook, act } from "@testing-library/react";
import { useToggle, usePagination } from "@/shared/hooks";

describe("Shared Hooks", () => {
  it("toggles boolean state", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });

  it("handles pagination safely", () => {
    const { result } = renderHook(() =>
      usePagination(25, 10)
    );

    expect(result.current.totalPages).toBe(3);
  });
});
