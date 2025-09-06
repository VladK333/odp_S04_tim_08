import type { ChatDto } from "../../models/chats/ChatDto";

interface ChatListProps {
  chats: Array<ChatDto | { id: number; name: string; userId: number }>;
  activeChat: ChatDto | null;
  onSelect: (c: ChatDto) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
  showCreate: () => void;
}

export function ChatList({ chats, activeChat, onSelect, onDelete, loading, showCreate }: ChatListProps) {
  return (
    <aside className="w-72 bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-pink-200 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Chats</h3>
        <button onClick={showCreate} className="px-2 py-1 text-sm rounded bg-pink-200">New</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : chats.length === 0 ? (
        <div className="text-sm text-gray-600">No chats yet</div>
      ) : (
        <ul className="space-y-2 max-h-[60vh] overflow-auto">
          {chats.map((c) => (
            <li key={c.id} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${activeChat?.id === c.id ? "bg-pink-100/60" : "hover:bg-white/50"}`}>
              <div onClick={() => onSelect(c as ChatDto)} className="flex-1 truncate">
                <div className="font-medium truncate">{c.name}</div>
                <div className="text-xs text-gray-600">id: {c.id}</div>
              </div>
              <button onClick={() => onDelete(c.id)} className="ml-2 text-sm text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
