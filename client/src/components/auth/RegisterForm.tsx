// src/components/auth/RegisterForm.tsx
import { useState } from "react";
import { useAuth } from "../../hooks/auth/useAuthHook";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";

export function RegisterForm({ authApi }: AuthFormProps) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullname || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await authApi.registracija(fullname, email, password, isPremium);
      if (response.success && response.data) {
            login(response.data);
            window.location.href = "/chat";
      } else {
        setError(response.message || "Registration failed.");
        setFullname("");
        setEmail("");
        setPassword("");
        setIsPremium(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        className="w-full bg-white/50 px-4 py-2 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
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

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="premium"
          checked={isPremium}
          onChange={() => setIsPremium(!isPremium)}
          className="accent-pink-500"
        />
        <label htmlFor="premium" className="text-sm text-gray-700">
          Become a Premium User
        </label>
      </div>

      {error && (
        <p className="text-md text-center text-red-700/80 font-medium">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white py-2 rounded-xl shadow-md transition"
      >
        Register
      </button>
    </form>
  );
}
