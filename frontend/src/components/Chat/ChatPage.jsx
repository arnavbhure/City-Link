import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatConversation from "./ChatConversation";
import ChatEmptyState from "./ChatEmptyState";
import ChatSidebar from "./ChatSidebar";
import LoadingSpinner from "../DashBoard/Loading/LoadingSpinner";
import useChatContacts from "./hooks/useChatContacts";
import useChatMessages from "./hooks/useChatMessages";
import useChatSocket from "./hooks/useChatSocket";
import { parseChatId } from "./utils/chatHelpers";

const MotionDiv = motion.div;

const ChatPage = () => {
  const { id: routeChatId } = useParams();
  const currentUserId = useSelector((state) => state.isLoggedIn.user_id);
  const { chatContacts, loadingContacts } = useChatContacts();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [draft, setDraft] = useState("");
  const { messagesByChatId, loadingMessages } = useChatMessages({
    selectedChatId,
    currentUserId,
  });
  const { sendMessage } = useChatSocket({ selectedChatId, currentUserId });

  const chatKey = selectedChatId ? String(selectedChatId) : null;

  useEffect(() => {
    const parsedRouteId = parseChatId(routeChatId);
    if (!parsedRouteId) return;

    const match = chatContacts.find(
      (chat) => String(chat.id) === String(parsedRouteId),
    );

    if (match) {
      setSelectedChatId(match.id);
    }
  }, [routeChatId, chatContacts]);

  const sortedChats = useMemo(() => {
    const next = [...chatContacts];

    next.sort((a, b) => {
      const aUnread = (a.unreadCount || 0) > 0;
      const bUnread = (b.unreadCount || 0) > 0;

      if (aUnread !== bUnread) return aUnread ? -1 : 1;

      const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;

      if (aTime !== bTime) return bTime - aTime;

      return a.name.localeCompare(b.name);
    });

    return next;
  }, [chatContacts]);

  const filteredChats = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return sortedChats;

    return sortedChats.filter((chat) =>
      [chat.name, chat.city, chat.lastMessage]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [searchValue, sortedChats]);

  const activeChat = chatContacts.find(
    (chat) => String(chat.id) === String(selectedChatId),
  );
  const activeMessages = chatKey ? messagesByChatId[chatKey] || [] : [];

  const handleSend = useCallback(() => {
    const text = draft.trim();
    if (!selectedChatId || !text) return;

    sendMessage(selectedChatId, text);
    setDraft("");
  }, [draft, selectedChatId, sendMessage]);

  if (loadingContacts && chatContacts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative flex h-[100dvh] overflow-hidden bg-slate-950 px-4 pb-4 pt-28 text-white sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
        <div className="mb-4 flex shrink-0 flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">
              CityLink chat
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Messages
            </h1>
          </div>
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="flex min-h-0 flex-1 overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/30 backdrop-blur-sm sm:rounded-[2rem] md:grid md:grid-cols-[21rem_minmax(0,1fr)]"
        >
          <ChatSidebar
            chats={filteredChats}
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            isLoading={loadingContacts}
            className={activeChat ? "hidden md:flex" : "flex"}
          />

          <AnimatePresence mode="wait">
            {activeChat ? (
              <MotionDiv
                key={activeChat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative min-h-0 min-w-0 flex-1 md:h-full"
              >
                <ChatConversation
                  chat={activeChat}
                  messages={activeMessages}
                  draft={draft}
                  onDraftChange={setDraft}
                  onSend={handleSend}
                  onBack={() => setSelectedChatId(null)}
                />
                {loadingMessages && activeMessages.length === 0 ? (
                  <div className="absolute inset-x-0 top-20 mx-auto w-fit rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-slate-400">
                    Loading messages...
                  </div>
                ) : null}
              </MotionDiv>
            ) : (
              <MotionDiv
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="hidden min-h-0 min-w-0 md:flex md:h-full"
              >
                <ChatEmptyState />
              </MotionDiv>
            )}
          </AnimatePresence>
        </MotionDiv>
      </div>
    </div>
  );
};

export default ChatPage;
