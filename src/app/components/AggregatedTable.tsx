'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { AggregatedData, useAggregatedData } from './queries';

export const columns: ColumnDef<AggregatedData>[] = [
  {
    accessorKey: "totalInvestment",
    header: "Total investment",
  },
  {
    accessorKey: "totalCurrentValue",
    header: "Total current value",
  },
  {
    accessorKey: "totalGainLoss",
    header: "Total gain/loss",
  }
]

export const AggregatedTable = () => {
  const { data: aggregatedData = [] } = useAggregatedData();

  return (
    <div>
      <h2 className="p-2 text-3xl font-semibold tracking-tight">Aggregated data</h2>
      <DataTable data={aggregatedData} columns={columns} />
    </div>
  );
}