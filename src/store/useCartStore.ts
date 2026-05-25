import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CartState {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "cantidad">) => void;

  removeItem: (id: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existe = state.items.find(
            (i) => i.id === item.id
          );

          if (existe) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      cantidad: i.cantidad + 1,
                    }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                cantidad: 1,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== id
          ),
        })),
    }),
    { name: "cart-storage" }
  )
);