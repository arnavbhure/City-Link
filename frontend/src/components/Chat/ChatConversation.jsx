import ChatComposer from "./ChatComposer";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";

const ChatConversation = ({
  chat,
  messages,
  draft,
  onDraftChange,
  onSend,
  onBack,
}) => {
  return (
    <section className="grid h-full min-h-0 min-w-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-slate-950">
      <ChatHeader chat={chat} onBack={onBack} />
      <ChatMessageList messages={messages} />
      <ChatComposer value={draft} onChange={onDraftChange} onSend={onSend} />
    </section>
  );
};

export default ChatConversation;
