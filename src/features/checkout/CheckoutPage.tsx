import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useFormasPago, useCreatePedido } from "../../hooks/usePedidos";
import { useDirecciones } from "../../hooks/useDirecciones";
import { useAuthStore } from "../../store/useAuthStore";

export const CheckoutPage = () => {
  const { items, removeItem } = useCartStore();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const { data: formasPago } = useFormasPago();
  const { data: direcciones } = useDirecciones();
  const createPedido = useCreatePedido();

  const [formaPagoId, setFormaPagoId] = useState<number>(1);
  const [direccionId, setDireccionId] = useState<number | null>(null);
  const [notas, setNotas] = useState("");
  const [successId, setSuccessId] = useState<number | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Necesitás iniciar sesión</h1>
        <p className="text-gray-500 mb-6">Para realizar un pedido, primero tenés que iniciar sesión o registrarte.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">Iniciar sesión</Link>
          <Link to="/register" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold">Registrarse</Link>
        </div>
      </div>
    );
  }

  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  const handleSubmit = async () => {
    try {
      const pedido = await createPedido.mutateAsync({
        forma_pago_id: formaPagoId,
        direccion_entrega_id: direccionId,
        notas: notas || null,
        items: items.map((i) => ({
          producto_id: i.id,
          cantidad: i.cantidad,
        })),
      });
      setSuccessId(pedido.id);
    } catch {
      alert("Error al crear el pedido. Intentá de nuevo.");
    }
  };

  if (successId) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-2">Pedido confirmado</h1>
        <p className="text-gray-500 mb-2">Pedido #{successId} creado correctamente.</p>
        <div className="flex gap-4 justify-center mt-6">
          <Link to="/orders" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">Ver mis pedidos</Link>
          <Link to="/" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold">Seguir comprando</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Confirmar pedido</h1>

      {/* Resumen del carrito */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Productos</h2>
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
            <div>
              <p className="font-medium">{item.nombre}</p>
              <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-bold">${item.precio * item.cantidad}</p>
              <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm">Eliminar</button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <p className="text-xl font-bold">Total</p>
          <p className="text-2xl font-bold text-blue-600">${total}</p>
        </div>
      </div>

      {/* Dirección de entrega */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Dirección de entrega</h2>

        {direcciones && direcciones.length > 0 ? (
          <div className="space-y-2">
            {direcciones.map((dir) => (
              <label
                key={dir.id}
                className={`block p-3 rounded-xl border cursor-pointer transition ${
                  direccionId === dir.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="direccion"
                  value={dir.id}
                  checked={direccionId === dir.id}
                  onChange={() => setDireccionId(dir.id)}
                  className="sr-only"
                />
                <p className="font-medium">{dir.alias}</p>
                <p className="text-sm text-gray-500">
                  {dir.calle} {dir.numero}, {dir.ciudad}, {dir.provincia}
                </p>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No tenés direcciones registradas. El pedido se creará sin dirección.</p>
        )}
      </div>

      {/* Forma de pago */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Forma de pago</h2>

        <div className="space-y-2">
          {formasPago?.map((fp) => (
            <label
              key={fp.id}
              className={`block p-3 rounded-xl border cursor-pointer transition ${
                formaPagoId === fp.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="formaPago"
                value={fp.id}
                checked={formaPagoId === fp.id}
                onChange={() => setFormaPagoId(fp.id)}
                className="sr-only"
              />
              <p className="font-medium">{fp.nombre}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Notas */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Notas</h2>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Algún comentario para el pedido..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none"
          rows={3}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={createPedido.isPending || items.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-xl text-lg font-bold transition"
      >
        {createPedido.isPending ? "Creando pedido..." : "Confirmar pedido"}
      </button>
    </div>
  );
};
