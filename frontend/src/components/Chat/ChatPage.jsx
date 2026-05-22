import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatConversation from "./ChatConversation";
import ChatEmptyState from "./ChatEmptyState";
import ChatSidebar from "./ChatSidebar";
import { chatMessages } from "./chatMockData";
import getSidebarUsers from "../../api/chat/getSidebarUsers";

const MotionDiv = motion.div;

const getCurrentTime = () =>
  new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());

const ChatPage = () => {
  const [chatContacts, setChatContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await getSidebarUsers();
      setChatContacts(response.data);
    };

    fetchContacts();
  }, []);

  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState(chatMessages);

  const filteredChats = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return chatContacts;

    return chatContacts.filter((chat) =>
      [chat.name, chat.role, chat.location, chat.lastMessage]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [searchValue, chatContacts]);

  const activeChat = chatContacts.find((chat) => chat.id === selectedChatId);
  const activeMessages = selectedChatId
    ? localMessages[selectedChatId] || []
    : [];

  const handleSend = () => {
    const text = draft.trim();
    if (!selectedChatId || !text) return;

    setLocalMessages((currentMessages) => ({
      ...currentMessages,
      [selectedChatId]: [
        ...(currentMessages[selectedChatId] || []),
        {
          id: `${selectedChatId}-${Date.now()}`,
          sender: "me",
          text,
          time: getCurrentTime(),
        },
      ],
    }));
    setDraft("");
  };

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
                className="min-h-0 min-w-0 flex-1 md:h-full"
              >
                <ChatConversation
                  chat={activeChat}
                  messages={activeMessages}
                  draft={draft}
                  onDraftChange={setDraft}
                  onSend={handleSend}
                  onBack={() => setSelectedChatId(null)}
                />
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
