import type { ChatDto } from "../../models/chats/ChatDto";
import type { MessageDto } from "../../models/messages/MessageDto";
import type { UserDto } from "../../models/users/UserDto";
import { MessageInput } from "../message/MessageInput";


interface ChatWindowProps {
  activeChat: ChatDto | null;
  messages: MessageDto[];
  onSend: (text: string) => Promise<void> | void;
  isAuthenticated: boolean;
  user?: UserDto; // UserDto | undefined
}

export function ChatWindow({ activeChat, messages, onSend, isAuthenticated, user }: ChatWindowProps) {
  return (
    <main className="flex-1 flex flex-col bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-blue-100 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">{activeChat ? activeChat.name : "New Chat"}</h2>
          <div className="text-sm text-gray-600">{activeChat ? `Chat ID: ${activeChat.id}` : "No chat selected"}</div>
        </div>
        <div className="text-sm text-gray-500">{isAuthenticated ? (user?.isPremium ? "Premium" : "Standard") : "Guest"}</div>
      </div>

      <div className="flex-1 overflow-auto p-2 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">No messages yet — say hi 👋</div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`max-w-[70%] p-3 rounded-2xl ${m.isSentByAI ? "bg-pink-50 self-start" : "bg-blue-50 self-end"} shadow`}>
              <div className="text-sm">{m.text}</div>
              <div className="text-xs text-gray-400 mt-2">{new Date(m.sentTime).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <MessageInput onSend={onSend} disabled={isAuthenticated === false && false /* guest allowed */} />
      </div>
    </main>
  );
}
