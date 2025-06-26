import React from "react"
import { cn } from "@/lib/utils"

export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({ className, ...props }) => (
  <div className="relative w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
)

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
  <thead className={cn("[&_tr]:border-b border-gray-200", className)} {...props} />
)

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
  <tbody
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
)

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className, ...props }) => (
  <tr
    className={cn(
      "border-b border-gray-200 transition-colors hover:bg-gray-50",
      className
    )}
    {...props}
  />
)

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-gray-600",
      className
    )}
    {...props}
  />
)

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <td
    className={cn("p-4 align-middle", className)}
    {...props}
  />
)
