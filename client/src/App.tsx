import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import NotFoundStranica from "./pages/not_found/NotFoundPage";
import type { IAuthAPIService } from "./api/auth/IAuthAPIService";
import { AuthAPIService } from "./api/auth/AuthAPIService";
import { AuthPage } from "./pages/auth/AuthPage";

const authApi: IAuthAPIService = new AuthAPIService();

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage authApi={authApi} />} />
      <Route path="/auth" element={<AuthPage authApi={authApi} />} />
      <Route path="/404" element={<NotFoundStranica />} />
{/* 
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <KontrolnaTablaUserStranica />
            </ProtectedRoute>
          }
        /> */}

        {/* Preusmerava na dashboard kao default rutu */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch-all ruta za nepostojeće stranice */}
        <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
