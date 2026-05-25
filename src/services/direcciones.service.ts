import { api } from "./api";

export interface DireccionDTO {
  id: number;
  alias: string;
  calle: string;
  numero: string;
  ciudad: string;
  provincia: string;
  codigo_postal: string | null;
  referencia: string | null;
  es_principal: boolean;
  created_at: string;
}

export const getDirecciones = async (): Promise<DireccionDTO[]> => {
  const { data } = await api.get<DireccionDTO[]>("/direcciones/");
  return data;
};
