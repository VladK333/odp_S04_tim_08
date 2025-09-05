import { useState, useRef, useEffect } from "react";
import { sendChatCompletion } from "../../api/LMStudio/lmStudioApi";
import type { ChatMessage } from "../../api/LMStudio/IlmStudioApi";
import ToggleButton from "../buttons/ToggleButton";
import type { User } from "../../types/User";
import "./Chat.css";

interface ChatProps {
  newChatTrigger?: number;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const SYSTEM_PROMPT: ChatMessage = { role: "system", content: "You are a helpful assistant." };

export default function Chat({ newChatTrigger, user, setUser }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([SYSTEM_PROMPT]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const historyRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  // Reset chat kad se kreira novi
  useEffect(() => {
    if (newChatTrigger !== undefined) {
      setMessages([SYSTEM_PROMPT]);
      setInput("");
    }
  }, [newChatTrigger]);

  // Auto-scroll ka poslednjoj poruci
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!user) return; // guest user je već setovan u HomePage

    const text = input.trim();
    if (!text || loading) return;

    // Provera broja poruka
    if (user.messagesLeft <= 0) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "You have reached your daily limit of messages." }
      ]);
      return;
    }

    // Smanji broj poruka
    setUser(prev => prev ? { ...prev, messagesLeft: prev.messagesLeft - 1 } : prev);

    // Dodaj korisničku poruku
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendChatCompletion(next);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "⚠️ Greška: ne mogu da se povežem na LM Studio." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ width: isOpen ? "97%" : "80%" }}>
      <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Chat history */}
      <div className="history" ref={historyRef}>
        {messages
          .filter(m => m.role !== "system")
          .map((m, i) => (
            <div key={i} className={`${m.role === "user" ? "userMsg" : "aiMsg"} message`}>
              <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
            </div>
          ))
        }
        {loading && (
          <div className="aiMsg"><i>AI typing...</i></div>
        )}
      </div>

      {/* Input */}
      <div className="row">
        <input
          className="input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message…"
          onKeyDown={e => e.key === "Enter" ? handleSend() : null}
        />
        <button className="btn" onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}
