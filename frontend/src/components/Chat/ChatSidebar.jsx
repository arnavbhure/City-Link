import { Search, SlidersHorizontal } from "lucide-react";
import ChatListItem from "./ChatListItem";
import ChatSkeleton from "./ChatSkeleton";
import { gradients } from "./utils/util";

const ChatSidebar = ({
  chats,
  selectedChatId,
  onSelectChat,
  searchValue,
  onSearchChange,
  isLoading = false,
  className = "",
}) => {
  return (
    <aside
      className={`flex h-full min-h-0 flex-col border-white/10 bg-slate-900/70 backdrop-blur-sm md:border-r ${className}`}
    >
      <div className="border-b border-white/10 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">
              Messages
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-white">
              Chats
            </h1>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            aria-label="Chat filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <label className="mt-5 flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-slate-400 transition focus-within:border-indigo-300/40">
          <Search className="h-4 w-4 shrink-0" />
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search chats"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3 sm:p-4">
        {isLoading ? (
          <ChatSkeleton />
        ) : chats.length > 0 ? (
          chats.map((chat, index) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === selectedChatId}
              onSelect={onSelectChat}
              gradient={gradients[index % gradients.length]}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">
            <p className="text-sm font-semibold text-white">No chats found</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Try a different name or city.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
