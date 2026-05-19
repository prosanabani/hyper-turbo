"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "489e1d42",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "489e1d43",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "489e1d44",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "489e1d45",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

function statusLabel(
  status: Payment["status"],
  isRtl: boolean,
): string {
  if (isRtl) {
    const ar: Record<Payment["status"], string> = {
      success: "ناجح",
      processing: "قيد المعالجة",
      pending: "قيد الانتظار",
      failed: "فشل",
    };
    return ar[status];
  }
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function DataTableDemo({ isRtl }: { isRtl: boolean }) {
  const columns = React.useMemo<ColumnDef<Payment>[]>(
    () => [
      {
        accessorKey: "status",
        header: isRtl ? "الحالة" : "Status",
        cell: ({ row }) => (
          <Badge variant="outline">
            {statusLabel(row.original.status, isRtl)}
          </Badge>
        ),
      },
      {
        accessorKey: "email",
        header: isRtl ? "البريد الإلكتروني" : "Email",
      },
      {
        accessorKey: "amount",
        header: isRtl ? "المبلغ" : "Amount",
        cell: ({ row }) =>
          new Intl.NumberFormat(isRtl ? "ar-SA" : "en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.original.amount),
      },
    ],
    [isRtl],
  );

  const table = useReactTable({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } },
  });

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="w-full max-w-2xl space-y-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isRtl ? "لا توجد نتائج." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          {isRtl
            ? `صف ${table.getState().pagination.pageIndex + 1} من ${table.getPageCount()}`
            : `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {isRtl ? "السابق" : "Previous"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {isRtl ? "التالي" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
