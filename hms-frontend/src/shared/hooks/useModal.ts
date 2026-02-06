// src/shared/hooks/useModal.ts

import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  return {
    isOpen,
    open,
    close,
    toggle
  };
};
