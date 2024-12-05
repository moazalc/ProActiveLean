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
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Pencil,
  Trash2,
} from "lucide-react";
import { DataGridProps, SortConfig } from "../types/data-grid";

export function DataGrid<T>({
  data,
  columns,
  pageSize = 10,
  onRowClick,
  onEdit,
  onDelete,
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<Partial<T>>({});

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (
          (a as Record<string, any>)[sortConfig.key] <
          (b as Record<string, any>)[sortConfig.key]
        ) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (
          (a as Record<string, any>)[sortConfig.key] >
          (b as Record<string, any>)[sortConfig.key]
        ) {
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

  const handleEdit = (id: string) => {
    const itemToEdit = data.find((item) => (item as any).id === id);
    if (itemToEdit) {
      setEditingId(id);
      setEditingValues(itemToEdit);
    }
  };

  const handleSave = () => {
    if (editingId && onEdit) {
      onEdit(editingId, editingValues as T);
      setEditingId(null);
      setEditingValues({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingValues({});
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
            <TableHead>Actions</TableHead>
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
                  {editingId === (item as any).id ? (
                    <Input
                      value={(editingValues[column.key] as string) || ""}
                      onChange={(e) =>
                        setEditingValues({
                          ...editingValues,
                          [column.key]: e.target.value,
                        })
                      }
                    />
                  ) : column.render ? (
                    column.render(item[column.key], item)
                  ) : (
                    (item[column.key] as React.ReactNode)
                  )}
                </TableCell>
              ))}
              <TableCell>
                {editingId === (item as any).id ? (
                  <>
                    <Button onClick={handleSave} className="mr-2">
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEdit((item as any).id)}
                      className="mr-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => onDelete && onDelete((item as any).id)}
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
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
          Previous
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
          Next
        </Button>
      </div>
    </div>
  );
}
