import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserDTO {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string | null;
  activo: boolean;
  roles: string[];
}

interface AuthState {
  token: string | null;
  user: UserDTO | null;
  isAuthenticated: boolean;
  login: (token: string, user: UserDTO) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    { name: "store-auth" }
  )
);
