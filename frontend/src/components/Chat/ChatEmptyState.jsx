import { MessageCircle, Search, UsersRound } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const ChatEmptyState = () => {
  return (
    <div className="flex min-h-[34rem] flex-1 items-center justify-center bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_34%)] px-6 py-12">
      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="max-w-md text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-indigo-200/20 bg-indigo-300/10 text-indigo-200 shadow-2xl shadow-indigo-950/30">
          <MessageCircle className="h-7 w-7" />
        </div>

        <h2 className="mt-6 text-2xl font-black tracking-tight text-white sm:text-3xl">
          Select a conversation
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          Choose a roommate match or listing contact from the left to continue
          the conversation.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-left">
            <UsersRound className="h-5 w-5 text-indigo-200" />
            <p className="mt-3 text-sm font-bold text-white">Recent matches</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Keep roommate chats close at hand.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-left">
            <Search className="h-5 w-5 text-indigo-200" />
            <p className="mt-3 text-sm font-bold text-white">Quick search</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Find the right person without losing flow.
            </p>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default ChatEmptyState;
