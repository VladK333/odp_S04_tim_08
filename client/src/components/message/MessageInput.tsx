import { useState } from "react";

interface MessageInputProps {
  onSend: (text: string) => Promise<void> | void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    try {
      await onSend(text.trim());
      setText("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 rounded-xl bg-white/60 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
        disabled={disabled}
      />
      <button type="submit" disabled={sending || disabled} className="px-4 py-2 rounded-xl bg-pink-500 text-white">
        {sending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
