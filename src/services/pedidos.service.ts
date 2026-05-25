import { api } from "./api";

export interface DetallePedidoDTO {
  id: number;
  producto_id: number;
  producto_nombre: string;
  precio_unitario: number;
  cantidad: number;
  subtotal: number;
}

export interface PedidoDTO {
  id: number;
  usuario_id: number;
  total: number;
  estado: string;
  forma_pago: string;
  notas: string | null;
  created_at: string;
  detalles: DetallePedidoDTO[];
}

export interface FormaPagoDTO {
  id: number;
  nombre: string;
  codigo: string;
}

export interface CreatePedidoData {
  direccion_entrega_id?: number | null;
  forma_pago_id: number;
  notas?: string | null;
  items: { producto_id: number; cantidad: number }[];
}

export const getPedidos = async (): Promise<PedidoDTO[]> => {
  const { data } = await api.get<PedidoDTO[]>("/pedidos/");
  return data;
};

export const getFormasPago = async (): Promise<FormaPagoDTO[]> => {
  const { data } = await api.get<FormaPagoDTO[]>("/pedidos/formas-pago");
  return data;
};

export const createPedido = async (pedido: CreatePedidoData): Promise<PedidoDTO> => {
  const { data } = await api.post<PedidoDTO>("/pedidos/", pedido);
  return data;
};
