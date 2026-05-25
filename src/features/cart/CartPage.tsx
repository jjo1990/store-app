import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

export const CartPage = () => {
  const { items, removeItem } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Carrito vacío</h1>
        <p className="text-gray-400 mb-6">Agregá productos desde la tienda.</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Carrito</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center justify-between"
          >
            <div>
              <h2 className="font-bold text-lg">{item.nombre}</h2>
              <p className="text-gray-500">Cantidad: {item.cantidad}</p>
            </div>

            <div className="flex items-center gap-5">
              <p className="font-bold text-blue-600">
                ${item.precio * item.cantidad}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Total</h2>
          <p className="text-3xl font-bold text-blue-600">${total}</p>
        </div>

        <Link
          to="/checkout"
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-bold transition"
        >
          Ir al checkout
        </Link>
      </div>
    </div>
  );
};