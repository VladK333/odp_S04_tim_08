import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { AuthAPIService } from "./api/auth/AuthAPIService";

const authService = new AuthAPIService();

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage authService={authService} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
