import { useQuery } from '@tanstack/react-query';

export type Investment = {
  id: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
}

export const useInvestments = () => {
  return useQuery<Investment[]>({
    queryKey: ['investments'],
    queryFn: async () => {
      const response = await fetch('/api/investments');

      if (!response.ok) {
        throw new Error('Problem with fetching investments');
      }

      return response.json();
    },
  });
};

export type AggregatedData = {
  totalInvestment: number;
  totalCurrentValue: number;
  totalGainLoss: number;
}

export const useAggregatedData = () => {
  return useQuery<AggregatedData[]>({
    queryKey: ['investments', 'aggregated'],
    queryFn: async () => {
      const response = await fetch('/api/investments/aggregated');

      if (!response.ok) {
        throw new Error('Problem with fetching aggregated data');
      }

      return [await response.json()];
    },
  });
};