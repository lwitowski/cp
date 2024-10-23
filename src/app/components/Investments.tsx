'use client';

import { useState, useMemo, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { Investment, useInvestments } from './queries';
import { useUpdateInvestment } from './mutations';
import Link from 'next/link';

export const Investments = () => {
  const { data: investments = [] } = useInvestments();
  const updateInvestment = useUpdateInvestment();

  const columns: ColumnDef<Investment>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: "Stock name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ getValue, row: { original } }) => {
        const initialValue = getValue()
        const [value, setValue] = useState(initialValue);

        const onBlur = async () => {
          if (initialValue === value) {
            return;
          }

          updateInvestment.mutate({ id: original.id, quantity: parseInt(value as string) }); // todo: fix type, add validation?
        }

        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        return (
          <input
            value={value as string}
            onChange={event => setValue(event.target.value)}
            onBlur={onBlur}
          />
        )
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
  ], []);

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