// src/shared/utils/array.utils.ts

export const uniqueBy = <T, K>(
  array: T[],
  key: (item: T) => K
): T[] => {
  const map = new Map<K, T>();
  array.forEach((item) => map.set(key(item), item));
  return Array.from(map.values());
};

export const sortBy = <T>(
  array: T[],
  selector: (item: T) => any
): T[] => {
  return [...array].sort((a, b) => {
    const av = selector(a);
    const bv = selector(b);
    if (av > bv) return 1;
    if (av < bv) return -1;
    return 0;
  });
};
