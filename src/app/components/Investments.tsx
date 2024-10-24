'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { Investment, useInvestments } from './queries';
import { EditableCell } from './EditableCell';
import Link from 'next/link';

const columns: ColumnDef<Investment>[] = [
  {
    accessorKey: "name",
    header: "Stock name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ getValue, row: { original } }) => {
      return (
        <EditableCell
          initialValue={getValue<string>()}
          rowId={original.id}
        />
      );
    },
  },
  {
    accessorKey: "buyPrice",
    header: "Buy price",
  },
  {
    accessorKey: "currentPrice",
    header: "Current price",
  }
];

export const Investments = () => {
  const { data: investments = [] } = useInvestments();

  const handleExport = async () => {
    const response = await fetch('/api/investments/export');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'investments.csv');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <div>
      <h2 className="p-2 text-3xl font-semibold tracking-tight">Investments</h2>
      <Link href="/investments">
        <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add investment
        </button>
      </Link>
      <button onClick={handleExport} className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Export to CSV
      </button>
      <DataTable data={investments} columns={columns} />
    </div>
  );
}