import { api } from "./api";

export interface ProductoDTO {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio_base: number;
  imagenes_url: string[];
  stock_cantidad: number;
  disponible: boolean;
  created_at: string;
  updated_at: string;
}

export const getProductos = async (): Promise<ProductoDTO[]> => {
  const { data } = await api.get<ProductoDTO[]>("/productos/");
  return data;
};
