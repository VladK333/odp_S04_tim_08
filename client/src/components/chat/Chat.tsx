import { useState, useRef, useEffect } from "react";
import { sendChatCompletion  } from "../../api/LMStudio/lmStudioApi";
import type { ChatMessage } from "../../api/LMStudio/IlmStudioApi";
import ToggleButton from "../buttons/ToggleButton";

import type { User } from "../../types/User";
import "./Chat.css";

interface ChatProps {
  newChatTrigger?: number;

  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Chat({ newChatTrigger, user, setUser }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const historyRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (newChatTrigger !== undefined) {
      setMessages([
        { role: "system", content: "You are a helpful assistant." },
      ]);
      setInput("");
    }
  }, [newChatTrigger]);

  async function handleSend() {
    if (!user) return;

    const text = input.trim();
    if (!text || loading) return;

    if (user.messagesLeft <= 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "You have reached your daily limit of messages.",
        },
      ]);
      return;
    }

    setUser((prev) =>
      prev ? { ...prev, messagesLeft: prev.messagesLeft - 1 } : prev
    );

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendChatCompletion(next);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch  {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: " Greška: ne mogu da se povežem na LM Studio.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (newChatTrigger !== undefined) {
      setMessages([
        { role: "system", content: "You are a helpful assistant." },
      ]);
      setInput("");
    }
  }, [newChatTrigger]);

  return (
    <div className="page" style={{ width: isOpen ? "97%" : "80%" }}>
      <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* CHAT */}
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

      {/* INPUT */}
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
