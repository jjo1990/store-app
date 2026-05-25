import { useCartStore } from "../../store/useCartStore";
import { useProductos } from "../../hooks/useProductos";

export const ProductsPage = () => {
  const { addItem } = useCartStore();
  const { data: productos, isLoading } = useProductos();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-lg">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Productos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {productos?.filter((p) => p.disponible).map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200"
          >
            <img
              src={producto.imagenes_url?.[0] ?? "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"}
              alt={producto.nombre}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold">
                {producto.nombre}
              </h2>

              <p className="text-2xl text-blue-600 font-bold mt-3">
                ${producto.precio_base}
              </p>

              <button
                onClick={() =>
                  addItem({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio_base,
                  })
                }
                disabled={!producto.disponible}
                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};