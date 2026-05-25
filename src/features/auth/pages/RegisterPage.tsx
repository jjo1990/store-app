import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { register } from "../../../services/auth.service";

export const RegisterPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginStore = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await register(form);
      loginStore(data.access_token, data.user);
      navigate("/", { replace: true });
    } catch {
      setError("Error al registrarse. El email podría ya estar en uso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-2">Store App</h1>
        <p className="text-gray-500 text-center mb-6">Crear cuenta</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input name="apellido" value={form.apellido} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-2" />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-2" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-2" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-2" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
};
