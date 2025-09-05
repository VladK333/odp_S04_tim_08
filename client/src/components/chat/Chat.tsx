// Chat.tsx
import { useState, useRef, useEffect } from "react";
import { sendChatCompletion } from "../../api/LMStudio/lmStudioApi";
import type { ChatMessage } from "../../api/LMStudio/IlmStudioApi";
import ToggleButton from "../buttons/ToggleButton";
import type { User } from "../../types/User";
import "./Chat.css";
import { chatApi } from "../../api/chats/ChatAPIService";
import { messageApi } from "../../api/messages/MessageAPIService";


interface ChatProps {
  newChatTrigger?: number;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token?: string; // JWT token (prosleđuješ iz auth)
}

const SYSTEM_PROMPT: ChatMessage = {
  role: "system",
  content: "You are a helpful assistant.",
};

export default function Chat({ newChatTrigger, user, setUser, token }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([SYSTEM_PROMPT]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);

  const historyRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Reset chat kad se kreira novi
  useEffect(() => {
    if (newChatTrigger !== undefined) {
      setMessages([SYSTEM_PROMPT]);
      setInput("");

      if (user && user.fullname !== "Guest" && token) {
        (async () => {
          const newChat = await chatApi.createChat("New Chat", user.id!, token);
          if (newChat) setChatId(newChat.id);
        })();
      }
    }
  }, [newChatTrigger, user, token]);

  // Auto-scroll ka poslednjoj poruci
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Učitavanje istorije za registrovanog usera
  useEffect(() => {
    if (user && user.fullname !== "Guest" && token) {
      (async () => {
        const chats = await chatApi.getUserChats(user.id!, token);
        if (chats.length > 0) {
          const lastChat = chats[chats.length - 1];
          setChatId(lastChat.id);
          const msgs = await messageApi.getMessagesByChatId(lastChat.id, token);

          setMessages([
            SYSTEM_PROMPT,
            ...msgs.map(
              (m) =>
                ({
                  role: m.isSentByAI ? "assistant" : "user",
                  content: m.text,
                } as ChatMessage)
            ),
          ]);
        } else {
          const newChat = await chatApi.createChat("New Chat", user.id!, token);
          if (newChat) {
            setChatId(newChat.id);
            setMessages([SYSTEM_PROMPT]);
          }
        }
      })();
    }
  }, [user, token]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (!user) return;

    // Provera limita
    if (!user.isPremium && user.messagesLeft <= 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: "You have reached your daily limit of messages.",
        },
      ]);
      return;
    }

    // Ažuriraj broj poruka i vreme
    setUser((prev) =>
      prev
        ? {
            ...prev,
            messagesLeft: prev.isPremium ? Infinity : prev.messagesLeft - 1,
            lastMessageTime: new Date(),
          }
        : prev
    );

    const userMsg: ChatMessage = { role: "user", content: text };
    const next: ChatMessage[] = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // Snimi poruku u bazu ako je registrovan
      if (user.fullname !== "Guest" && chatId && token) {
        await messageApi.createMessage(text, false, Date.now().toString(), chatId, token);
      }

      // AI odgovor
      const reply = await sendChatCompletion(next);
      const aiMsg: ChatMessage = { role: "assistant", content: reply };

      setMessages([...next, aiMsg]);

      if (user.fullname !== "Guest" && chatId && token) {
        await messageApi.createMessage(reply, true, Date.now().toString(), chatId, token);
      }
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant" as const,
          content: "⚠️ Greška: ne mogu da se povežem na LM Studio.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ width: isOpen ? "97%" : "80%" }}>
      <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="history" ref={historyRef}>
        {messages
          .filter((m) => m.role !== "system")
          .map((m, i) => (
            <div
              key={i}
              className={`${m.role === "user" ? "userMsg" : "aiMsg"} message`}
            >
              <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
            </div>
          ))}
        {loading && (
          <div className="aiMsg">
            <i>AI typing...</i>
          </div>
        )}
      </div>

      <div className="row">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message…"
          onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
        />
        <button className="btn" onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
