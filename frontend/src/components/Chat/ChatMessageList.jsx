import { useLayoutEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";

const ChatMessageList = () => {
  const scrollRef = useRef(null);

  let messages = [];

  useLayoutEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const frameId = window.requestAnimationFrame(() => {
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="min-h-0 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.8),rgba(2,6,23,0.95))] px-4 py-5 sm:px-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        <div className="mb-2 flex justify-center">
          <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-slate-400">
            Today
          </span>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatMessageList;
