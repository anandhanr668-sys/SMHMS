// src/shared/hooks/useToggle.ts

import { useState } from "react";

export const useToggle = (
  initial = false
): [boolean, () => void, (v: boolean) => void] => {
  const [value, setValue] = useState(initial);

  const toggle = () => setValue((v) => !v);
  const set = (v: boolean) => setValue(v);

  return [value, toggle, set];
};
