const formatMessageTime = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const formatSidebarTime = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
};

const normalizeContact = (contact) => {
  const lastMessageAt = contact?.lastMessageTime
    ? new Date(contact.lastMessageTime)
    : null;
  const lastMessageAtIso =
    lastMessageAt && !Number.isNaN(lastMessageAt.getTime())
      ? lastMessageAt.toISOString()
      : null;

  return {
    ...contact,
    lastMessage: contact?.lastMessage || "",
    lastMessageAt: lastMessageAtIso,
    lastMessageTime: lastMessageAtIso
      ? formatSidebarTime(lastMessageAtIso)
      : "",
    unreadCount: Number(contact?.unreadCount) || 0,
  };
};

const buildLastMessageMeta = (text, timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  const iso = safeDate.toISOString();

  return {
    lastMessage: text,
    lastMessageAt: iso,
    lastMessageTime: formatSidebarTime(iso),
  };
};

const mapMessage = (message, currentUserId) => {
  const isMine = String(message.sender_id) === String(currentUserId);
  return {
    id: message.id,
    sender: isMine ? "me" : "other",
    text: message.message,
    time: formatMessageTime(message.created_at),
  };
};

const parseChatId = (value) => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? value : parsed;
};

export {
  formatMessageTime,
  formatSidebarTime,
  normalizeContact,
  buildLastMessageMeta,
  mapMessage,
  parseChatId,
};
