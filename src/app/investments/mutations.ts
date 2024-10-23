import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddInvestment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string,
      quantity: number,
      buyPrice: number,
      currentPrice: number,
    }) => {
      await fetch(`/api/investments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
    },
  });
}