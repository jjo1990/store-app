import { api } from "./api";

export interface LoginDTO {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    telefono: string | null;
    activo: boolean;
    roles: string[];
  };
}

export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono?: string;
}

export const login = async (email: string, password: string): Promise<LoginDTO> => {
  const { data } = await api.post<LoginDTO>("/auth/login", { email, password });
  return data;
};

export const register = async (data: RegisterData): Promise<LoginDTO> => {
  const { data: result } = await api.post<LoginDTO>("/auth/register", data);
  return result;
};
