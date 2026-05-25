import { Outlet, Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

export const StoreLayout = () => {
  const { items } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Store App
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/orders"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Mis pedidos
              </Link>

              <span className="text-sm text-gray-400">{user?.nombre}</span>

              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600 text-sm font-medium transition"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Iniciar sesión
            </Link>
          )}

          <Link
            to="/cart"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium relative"
          >
            Carrito
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};
