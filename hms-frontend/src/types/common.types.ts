// src/types/common.types.ts

export type ID = string;

export type ISODateString = string;

export interface BaseEntity {
  id: ID;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
}

export type Status = "ACTIVE" | "INACTIVE";

export interface SelectOption {
  label: string;
  value: string;
}
