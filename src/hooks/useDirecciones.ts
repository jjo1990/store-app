import { useQuery } from "@tanstack/react-query";
import { getDirecciones } from "../services/direcciones.service";

export const useDirecciones = () => {
  return useQuery({
    queryKey: ["direcciones"],
    queryFn: getDirecciones,
  });
};
