import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import ChatAvatar from "./ChatAvatar";
import toggleBlockUser from "../../api/chat/BlockUser";

const ChatHeader = ({ chat, onBack }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlocking, setisBlocking] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleBlockUser = async (toBlockId) => {
    setisBlocking(true);
    try {
      await toggleBlockUser(toBlockId);
    } finally {
      setisBlocking(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handlePointerDown = (event) => {
      if (menuRef.current?.contains(event.target)) {
        return;
      }
      if (menuButtonRef.current?.contains(event.target)) {
        return;
      }
      setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMenuOpen]);

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
          </div>
          <p className="mt-0.5 truncate text-xs font-medium text-slate-400 sm:text-sm">
            {chat.city}
          </p>
        </div>
      </div>

      <div className="relative flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
          aria-label="More conversation actions"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          ref={menuButtonRef}
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
        {isMenuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full z-20 mt-2 w-40 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-lg shadow-black/40"
            ref={menuRef}
          >
            <button
              type="button"
              role="menuitem"
              className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-400 transition ${
                isBlocking
                  ? "cursor-not-allowed opacity-60"
                  : "hover:bg-white/10"
              }`}
              aria-busy={isBlocking}
              disabled={isBlocking}
              onClick={() => {
                setIsMenuOpen(false);
                handleBlockUser(chat.id);
              }}
            >
              <span className="inline-flex items-center gap-2">
                {isBlocking && (
                  <span
                    className="h-3 w-3 animate-spin rounded-full border border-red-300 border-t-transparent"
                    aria-hidden="true"
                  />
                )}
                {isBlocking ? "Blocking..." : "Block user"}
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ChatHeader;
