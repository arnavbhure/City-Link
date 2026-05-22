import { Paperclip, Send, Smile } from "lucide-react";

const ChatComposer = ({ value, onChange, onSend, disabled = false }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSend();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 z-20 shrink-0 border-t border-white/10 bg-slate-900/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-4"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-[1.4rem] border border-white/10 bg-slate-950/80 p-2 shadow-2xl shadow-black/20 transition focus-within:border-indigo-300/40">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={1}
          placeholder="Type a message"
          className="p-4 max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm leading-6 text-white outline-none placeholder:text-slate-500"
          disabled={disabled}
        />

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-300 text-slate-950 shadow-lg shadow-indigo-950/20 transition hover:bg-indigo-200 disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-slate-500 disabled:shadow-none"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatComposer;
