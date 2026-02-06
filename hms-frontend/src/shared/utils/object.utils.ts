// src/shared/utils/object.utils.ts

export const omitEmpty = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        value !== ""
    )
  ) as Partial<T>;
};
