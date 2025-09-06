import { useState } from "react";

interface NewChatModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export function NewChatModal({ open, onClose, onCreate }: NewChatModalProps) {
  const [name, setName] = useState("");

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white/80 backdrop-blur p-6 rounded-2xl w-full max-w-md border border-pink-200">
        <h3 className="text-lg font-semibold mb-3">Create new chat</h3>
        <form onSubmit={submit} className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Chat name" className="w-full px-4 py-2 rounded-xl border" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-200">Cancel</button>
            <button type="submit" className="px-3 py-1 rounded bg-pink-400 text-white">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
