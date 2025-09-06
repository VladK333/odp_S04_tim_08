import { useEffect, useState } from "react";
import type { IAuthAPIService } from "../../api/auth/IAuthAPIService";
import { LoginForm } from "../../components/auth/LoginForm";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { useAuth } from "../../hooks/auth/useAuthHook";

interface AuthPageProps {
  authApi: IAuthAPIService;
}

export function AuthPage({ authApi }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if(isAuthenticated)
      window.location.href = "/chat";
  }, [isAuthenticated])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-white to-blue-200 relative overflow-hidden">
      {/* Sakura Petals Background (anime feel) */}
      {/* Falling Sakura Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-5 bg-pink-300 rounded-full opacity-70 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Card */}
      <div className="relative bg-white/60 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md border border-pink-300">
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              activeTab === "login"
                ? "bg-pink-500/80 text-white shadow-lg"
                : "bg-white/40 text-gray-600 hover:bg-white/60"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              activeTab === "register"
                ? "bg-blue-500/80 text-white shadow-lg"
                : "bg-white/40 text-gray-600 hover:bg-white/60"
            }`}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <LoginForm authApi={authApi} />
        ) : (
          <RegisterForm authApi={authApi} />
        )}
      </div>
    </div>
  );
}
