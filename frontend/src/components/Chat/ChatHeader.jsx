import { ArrowLeft, MoreHorizontal } from "lucide-react";
import ChatAvatar from "./ChatAvatar";

const ChatHeader = ({ chat, onBack }) => {
  const isOnline = chat.status.toLowerCase() === "online";

  return (
    <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-3 backdrop-blur-sm sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white/[0.08] hover:text-white md:hidden"
          aria-label="Back to chats"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <ChatAvatar name={chat.name} color={chat.avatarColor} size="lg" />

        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="truncate text-base font-black text-white sm:text-lg">
              {chat.name}
            </h2>
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                isOnline ? "bg-emerald-300" : "bg-slate-500"
              }`}
              aria-hidden="true"
            />
          </div>
          <p className="mt-0.5 truncate text-xs font-medium text-slate-400 sm:text-sm">
            {chat.status} - {chat.location}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
          aria-label="More conversation actions"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
