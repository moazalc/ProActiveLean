"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { DataGridProps, SortConfig } from "../types/data-grid";

export function DataGrid<T extends { [key: string]: any }>({
  data,
  columns,
  pageSize = 10,
  onRowClick,
  renderActions,
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, sortedData]);

  const totalPages = Math.ceil(data.length / pageSize);

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key: key as string, direction });
  };

  const renderSortIcon = (column: keyof T) => {
    if (!sortConfig || sortConfig.key !== column) {
      return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key as string}
                style={{ width: column.width }}
                className={column.sortable ? "cursor-pointer select-none" : ""}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && renderSortIcon(column.key)}
                </div>
              </TableHead>
            ))}
            {renderActions && <TableHead>Eylemler</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTableData.map((item) => (
            <TableRow
              key={(item as any).id}
              onClick={() => onRowClick && onRowClick(item)}
              className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
            >
              {columns.map((column) => (
                <TableCell key={column.key as string}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : (item[column.key] as React.ReactNode)}
                </TableCell>
              ))}
              {renderActions && <TableCell>{renderActions(item)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
          disabled={currentPage === 1}
        >
          Önceki
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Sonraki
        </Button>
      </div>
    </div>
  );
}
