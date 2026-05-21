import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const MotionDiv = motion.div;

const ChatBubble = ({ message }) => {
  const isMine = message.sender === "me";

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex w-full", isMine ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[82%] rounded-3xl px-4 py-3 shadow-lg sm:max-w-[68%]",
          isMine
            ? "rounded-br-lg bg-indigo-300 text-slate-950 shadow-indigo-950/20"
            : "rounded-bl-lg border border-white/10 bg-white/[0.07] text-slate-100 shadow-black/10",
        )}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">{message.text}</p>
        <div
          className={cn(
            "mt-2 flex items-center justify-end gap-2 text-[0.68rem] font-semibold",
            isMine ? "text-slate-700" : "text-slate-500",
          )}
        >
          <span>{message.time}</span>
          {message.status && <span>{message.status}</span>}
        </div>
      </div>
    </MotionDiv>
  );
};

export default ChatBubble;
