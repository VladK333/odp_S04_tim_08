import {
  Routes,
  Route,
} from "react-router-dom";
import NotFoundStranica from "./pages/not_found/NotFoundPage";
import type { IAuthAPIService } from "./api/auth/IAuthAPIService";
import { AuthAPIService } from "./api/auth/AuthAPIService";
import { AuthPage } from "./pages/auth/AuthPage";
import { ChatPage } from "./pages/chats/ChatPage";
import type { IChatAPIService } from "./api/chats/IChatAPIService ";
import { ChatAPIService } from "./api/chats/ChatAPIService";
import type { IMessageAPIService } from "./api/messages/IMessageAPIService";
import { MessageAPIService } from "./api/messages/MessageAPIService";
import type { ILLMChatAPIService } from "./api/llm/ILLMChatAPIService";
import { LLMChatAPIService } from "./api/llm/LLMChatAPIService";
import type { IUserAPIService } from "./api/users/IUserAPIService";
import { UserAPIService } from "./api/users/UserAPIService";

const authApi: IAuthAPIService = new AuthAPIService();
const chatApi: IChatAPIService = new ChatAPIService();
const messageApi: IMessageAPIService = new MessageAPIService()
const llmApi: ILLMChatAPIService = new LLMChatAPIService();
const userApi: IUserAPIService = new UserAPIService();

const services = { authApi, chatApi, messageApi, llmApi, userApi }

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage  services={services}/>} />
      <Route path="/auth" element={<AuthPage authApi={authApi} />} />
      <Route path="/404" element={<NotFoundStranica />} />

      {/* Catch-all ruta za nepostojeće stranice */}
      {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
    </Routes>
  );
}

export default App;
