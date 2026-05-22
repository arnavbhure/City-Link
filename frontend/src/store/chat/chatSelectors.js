export const selectChatContacts = (state) => state.chat.contacts;

export const selectMessagesByChatId = (state) => state.chat.messagesByChatId;

export const selectMessagesForChat = (chatId) => (state) => {
  const chatKey = chatId ? String(chatId) : null;
  return chatKey ? state.chat.messagesByChatId[chatKey] || [] : [];
};
