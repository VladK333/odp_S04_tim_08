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
    if (isAuthenticated) window.location.href = "/chat";
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-20">
        <img
          src="/bg2.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>
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
