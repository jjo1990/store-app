import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPedidos, createPedido, getFormasPago } from "../services/pedidos.service";
import type { CreatePedidoData } from "../services/pedidos.service";

export const usePedidos = () => {
  return useQuery({
    queryKey: ["pedidos"],
    queryFn: getPedidos,
  });
};

export const useFormasPago = () => {
  return useQuery({
    queryKey: ["formas-pago"],
    queryFn: getFormasPago,
    staleTime: 1000 * 60 * 60, // 1 hora (no cambia seguido)
  });
};

export const useCreatePedido = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePedidoData) => createPedido(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });
    },
  });
};
