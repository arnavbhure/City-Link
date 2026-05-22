import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import ChatAvatar from "./ChatAvatar";

const MotionButton = motion.button;

const ChatListItem = ({ chat, isActive, onSelect, gradient }) => {
  return (
    <MotionButton
      type="button"
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(chat.id)}
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200",
        isActive
          ? "border-indigo-300/30 bg-indigo-400/10 shadow-lg shadow-indigo-950/20"
          : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.06]",
      )}
    >
      <ChatAvatar name={chat.name} color={gradient} />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{chat.name}</p>
          </div>
          <span className="shrink-0 text-xs font-medium text-slate-500">
            {chat.lastMessageTime}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <p className="min-w-0 flex-1 truncate text-sm leading-5 text-slate-400">
            {chat.lastMessage}
          </p>
          {chat.unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-indigo-300 px-1.5 text-[0.68rem] font-black text-slate-950">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </MotionButton>
  );
};

export default ChatListItem;
