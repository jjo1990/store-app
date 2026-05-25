import { useQuery } from "@tanstack/react-query";
import { getProductos } from "../services/productos.service";

export const useProductos = () => {
  return useQuery({
    queryKey: ["productos"],
    queryFn: getProductos,
  });
};
