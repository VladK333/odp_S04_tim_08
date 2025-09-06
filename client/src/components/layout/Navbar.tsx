import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuthHook";
import type { UserDto } from "../../models/users/UserDto";

interface NavbarProps {
  isAuthenticated: boolean;
  onCreate: () => void;
  onResetGuests: () => void;
  user?: UserDto;
}

export function Navbar({
  isAuthenticated,
  onCreate,
  onResetGuests,
  user,
}: NavbarProps) {
  const { logout } = useAuth();

  return (
    <nav className="px-6 py-4 flex items-center justify-between relative z-10 bg-white/50 mt-4 mx-4 rounded-xl border border-pink-700">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold">ČekAI 1.2</div>
        <button
          onClick={onCreate}
          className="px-3 py-1 rounded-xl bg-pink-500/60 hover:bg-pink-500/90 text-white shadow"
        >
          New Chat
        </button>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <>
            <div className="flex items-center gap-3 px-3 py-1 rounded-xl bg-white/40 border border-pink-200">
              <div className="text-sm font-medium">{user.email}</div>
              <div
                title={user.isPremium ? "Premium user" : "Standard user"}
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  user.isPremium
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {user.isPremium ? "Premium" : "Standard"}
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-1 rounded-xl bg-white/30 border border-blue-200">
              <div className="text-sm">
                Messages left:{" "}
                <span className="font-semibold">{user.messagesLeft}</span>
              </div>
            </div>

            <button
              onClick={() => logout()}
              className="px-3 py-1 rounded-xl bg-red-400/80 hover:bg-red-500 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth"
              className="px-3 py-1 rounded-xl bg-blue-400/80 text-white"
            >
              Login / Register
            </Link>
            <button
              onClick={onResetGuests}
              className="px-3 py-1 rounded-xl bg-white/30"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
