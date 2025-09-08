import { useState, useEffect, useCallback } from "react";
import { ChatList } from "../../components/chat/ChatList";
import { ChatWindow } from "../../components/chat/ChatWindow";
import { NewChatModal } from "../../components/chat/NewChatDialog";
import { Navbar } from "../../components/layout/Navbar";
import { useAuth } from "../../hooks/auth/useAuthHook";

import type { ChatDto } from "../../models/chats/ChatDto";
import type { MessageDto } from "../../models/messages/MessageDto";
import type { UserDto } from "../../models/users/UserDto";
import type { ChatPageServices } from "../../types/props/auth_form_props/chat_page_props/ChatProps";

interface ChatPageProps {
  services: ChatPageServices;
}

export function ChatPage({ services }: ChatPageProps) {
  const { chatApi, messageApi, llmApi, userApi } = services;
  const { user, token, isAuthenticated } = useAuth();

  const [chats, setChats] = useState<ChatDto[]>([]);
  const [activeChat, setActiveChat] = useState<ChatDto | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [guestChats, setGuestChats] = useState<
    { id: string; name: string; messages: MessageDto[] }[]
  >([]);
  const [showNewChat, setShowNewChat] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);
  const [, setLlmMessageCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<UserDto>();

  // --- Fetch user info to keep messagesLeft updated ---
  const refreshUser = useCallback(async () => {
    if (isAuthenticated && user && token) {
      try {
        const fresh = await userApi.getUserById(user.id, token);
        if (fresh) setCurrentUser(fresh);
      } catch (err) {
        console.error("Failed to refresh user", err);
      }
    }
  }, [isAuthenticated, user, token, userApi]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // --- Load chats on mount if authenticated ---
  useEffect(() => {
    if (!isAuthenticated || !user || !token) {
      setChats([]);
      setActiveChat(null);
      return;
    }

    (async () => {
      setLoadingChats(true);
      try {
        const fetched = await chatApi.getUserChats(user.id, token);
        setChats(fetched);
        setActiveChat(fetched.length ? fetched[0] : null);
      } catch (err) {
        console.error("Failed to load chats", err);
      } finally {
        setLoadingChats(false);
      }
    })();
  }, [isAuthenticated, user, token, chatApi]);

  // --- Load messages when active chat changes ---
  useEffect(() => {
    if (!activeChat) {
      setMessages([]);
      return;
    }

    if (isAuthenticated && token) {
      (async () => {
        try {
          const msgs = await messageApi.getMessagesByChatId(activeChat.id, token);
          setMessages(msgs || []);
        } catch (err) {
          console.error("Failed to load messages", err);
        }
      })();
    } else {
      const g = guestChats.find((c) => c.id === `${activeChat.id}`);
      setMessages(g ? g.messages : []);
    }
  }, [activeChat, isAuthenticated, token, messageApi, guestChats]);

  // --- Create new chat ---
  const handleCreateChat = async (name: string) => {
    setShowNewChat(false);
    if (isAuthenticated && user && token) {
      try {
        const newChat = await chatApi.createChat(name, user.id, token);
        if (newChat) {
          setChats((prev) => [newChat, ...prev]);
          setActiveChat(newChat);
        }
      } catch (err) {
        console.error("Failed to create chat", err);
      }
    } else {
      const id = `guest-${Date.now()}`;
      const newGuest = { id, name, messages: [] as MessageDto[] };
      setGuestChats((prev) => [newGuest, ...prev]);
      setActiveChat({ id: -Date.now(), name, userId: -1 });
      setMessages([]);
      setLlmMessageCount(0);
    }
  };

  // --- Delete chat (only for logged in) ---
  const handleDeleteChat = async (chatId: number) => {
    if (!isAuthenticated || !token) return;
    try {
      const ok = await chatApi.deleteChat(chatId, token);
      if (ok) {
        setChats((p) => p.filter((c) => c.id !== chatId));
        if (activeChat?.id === chatId) {
          setActiveChat(chats.length ? chats[0] ?? null : null);
        }
      }
    } catch (err) {
      console.error("Failed to delete chat", err);
    }
  };

  // --- Reset guest chats ---
  const handleResetGuestChats = () => {
    setGuestChats([]);
    setMessages([]);
    setActiveChat(null);
    setLlmMessageCount(0);
  };

  // --- Send message handler ---
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Guest mode (not logged in)
    if (!isAuthenticated) {
      const sent: MessageDto = {
        id: Date.now(),
        text,
        isSentByAI: false,
        sentTime: Date.now(),
        chatId: activeChat ? activeChat.id : -1,
      };

      setMessages((prev) => [...prev, sent]);

      try {
        const replyText = await llmApi.sendMessage(text);
        const received: MessageDto = {
          id: 0,
          text: replyText,
          isSentByAI: true,
          sentTime: Date.now() / 1000,
          chatId: activeChat ? activeChat.id : -1,
        };

        setLlmMessageCount((prev) => Math.min(prev + 1, 50));

        setMessages((prev) => {
          let newPrev = [...prev, received];
          const aiMessages = newPrev.filter((m) => m.isSentByAI);
          if (aiMessages.length > 50) {
            const last50 = aiMessages.slice(-50);
            newPrev = [
              ...newPrev.filter((m) => !m.isSentByAI),
              ...last50,
            ];
          }
          return newPrev;
        });

        if (activeChat && `${activeChat.id}`.startsWith("guest-")) {
          setGuestChats((prev) =>
            prev.map((c) =>
              c.id === `${activeChat.id}`
                ? { ...c, messages: [...c.messages, sent, received] }
                : c
            )
          );
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            text: "Error: failed to get response from LLM.",
            isSentByAI: true,
            sentTime: Date.now() / 1000,
            chatId: activeChat ? activeChat.id : -1,
          },
        ]);
      }

      refreshUser();

      return;
    }

    // Authenticated flow
    if (isAuthenticated && token && currentUser && activeChat) {
      if (!currentUser.isPremium && currentUser.messagesLeft <= 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "You have exhausted your message quota. Upgrade to premium to send more.",
            isSentByAI: true,
            sentTime: Date.now(),
            chatId: activeChat.id,
          },
        ]);
        return;
      }

      try {
        const sentResponse = await messageApi.createMessage(
          text,
          false,
          (Date.now() / 1000),
          activeChat.id,
          token
        );

        const sentMessage = sentResponse ?? {
          id: Date.now(),
          text,
          isSentByAI: false,
          sentTime: Date.now() / 1000,
          chatId: activeChat.id,
        };
        setMessages((prev) => [...prev, sentMessage]);

        const replyText = await llmApi.sendMessage(text);

        const aiResponse = await messageApi.createMessage(
          replyText,
          true,
          Date.now() / 1000,
          activeChat.id,
          token
        );

        const aiMessage = aiResponse ?? {
          id: Date.now() + 1,
          text: replyText,
          isSentByAI: true,
          sentTime: Date.now() / 1000,
          chatId: activeChat.id,
        };

        setMessages((prev) => [...prev, aiMessage]);

        await refreshUser();
      } catch (err) {
        console.error("Failed send/save message", err);
      }
    }
  };

  // --- Combined chats (guest + user) ---
  const combinedChatList: ChatDto[] = isAuthenticated
    ? chats
    : guestChats.map((g) => ({
        id: Number(g.id.replace("guest-", "")) || -1,
        name: g.name,
        userId: -1,
      }));

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/bg.gif"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      </div>

      <Navbar
        isAuthenticated={isAuthenticated}
        user={currentUser}
        onCreate={() => setShowNewChat(true)}
        onResetGuests={handleResetGuestChats}
      />

      <div className="flex-1 flex gap-6 px-6 py-8">
        <ChatList
          chats={combinedChatList}
          activeChat={activeChat}
          onSelect={setActiveChat}
          onDelete={handleDeleteChat}
          loading={loadingChats}
          showCreate={() => setShowNewChat(true)}
        />

        <ChatWindow
          activeChat={activeChat}
          messages={messages}
          onSend={handleSendMessage}
          isAuthenticated={isAuthenticated}
          user={currentUser}
        />
      </div>

      <NewChatModal
        open={showNewChat}
        onClose={() => setShowNewChat(false)}
        onCreate={handleCreateChat}
      />
    </div>
  );
}
