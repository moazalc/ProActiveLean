import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  width?: number;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => ReactNode;
}

export interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  onRowClick?: (item: T) => void;
  renderActions?: (item: T) => ReactNode;
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}
