import { Routes, Route } from "react-router-dom";
import { AuthAPIService } from "./api/auth/AuthAPIService";
import type { IAuthAPIService } from "./api/auth/IAuthAPIService";
import HomePage from "./pages/HomePage";

const authService: IAuthAPIService = new AuthAPIService();

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage authService ={authService} />} />
      {/* <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} /> */}

        

    </Routes>
  );
}

export default App;