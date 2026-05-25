import { Link } from "react-router-dom";
import { usePedidos } from "../../hooks/usePedidos";
import { useAuthStore } from "../../store/useAuthStore";

const STATUS_COLORS: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-700",
  CONFIRMADO: "bg-blue-100 text-blue-700",
  EN_PREP: "bg-purple-100 text-purple-700",
  EN_CAMINO: "bg-orange-100 text-orange-700",
  ENTREGADO: "bg-green-100 text-green-700",
  CANCELADO: "bg-red-100 text-red-700",
};

export const OrdersPage = () => {
  const { data: pedidos, isLoading } = usePedidos();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Necesitás iniciar sesión</h1>
        <p className="text-gray-500 mb-6">Iniciá sesión para ver tus pedidos.</p>
        <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mis pedidos</h1>

      {(!pedidos || pedidos.length === 0) && (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">No tenés pedidos todavía.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">
            Ver productos
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {pedidos?.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white rounded-2xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Pedido #{pedido.id}</p>
                <p className="text-xs text-gray-400">
                  {new Date(pedido.created_at).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  STATUS_COLORS[pedido.estado] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {pedido.estado}
              </span>
            </div>

            <div className="space-y-1 mb-4">
              {pedido.detalles.map((det) => (
                <div key={det.id} className="flex justify-between text-sm">
                  <span>
                    {det.producto_nombre} x{det.cantidad}
                  </span>
                  <span className="font-medium">${det.subtotal}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-gray-500">
                Pago: {pedido.forma_pago}
              </span>
              <span className="text-xl font-bold text-blue-600">
                ${pedido.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
