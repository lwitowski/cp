import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateInvestment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string,
      quantity: number
    }) => {
      await fetch(`/api/investments/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: params.quantity }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
    },
  });
}