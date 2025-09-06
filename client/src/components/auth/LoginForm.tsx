import { useState } from "react";
import { useAuth } from "../../hooks/auth/useAuthHook";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";

export function LoginForm({ authApi }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await authApi.prijava(email, password);
    if (response.success && response.data) {
      login(response.data);
      window.location.href = "/chat";
    } else {
      setError(response.message || "Login failed.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-white/50 px-4 py-2 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-white/50 px-4 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && (
        <p className="text-md text-center text-red-700/80 font-medium">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white py-2 rounded-xl shadow-md transition"
      >
        Login
      </button>
    </form>
  );
}
