import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  messagesByChatId: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = Array.isArray(action.payload) ? action.payload : [];
    },
    updateContact: (state, action) => {
      const { chatId, changes } = action.payload || {};
      if (!chatId || !changes) return;
      const chatKey = String(chatId);

      state.contacts = state.contacts.map((chat) =>
        String(chat.id) === chatKey ? { ...chat, ...changes } : chat,
      );
    },
    markChatRead: (state, action) => {
      const chatKey = String(action.payload);
      state.contacts = state.contacts.map((chat) =>
        String(chat.id) === chatKey ? { ...chat, unreadCount: 0 } : chat,
      );
    },
    applyIncomingContactUpdate: (state, action) => {
      const { chatId, meta, isActive } = action.payload || {};
      if (!chatId || !meta) return;
      const chatKey = String(chatId);

      state.contacts = state.contacts.map((chat) => {
        if (String(chat.id) !== chatKey) return chat;

        const nextUnread = isActive ? 0 : (Number(chat.unreadCount) || 0) + 1;

        return {
          ...chat,
          ...meta,
          unreadCount: nextUnread,
        };
      });
    },
    setMessagesForChat: (state, action) => {
      const { chatId, messages } = action.payload || {};
      if (!chatId) return;
      const chatKey = String(chatId);
      state.messagesByChatId[chatKey] = Array.isArray(messages) ? messages : [];
    },
    appendMessage: (state, action) => {
      const { chatId, message } = action.payload || {};
      if (!chatId || !message) return;
      const chatKey = String(chatId);
      const existingMessages = state.messagesByChatId[chatKey] || [];
      state.messagesByChatId[chatKey] = [...existingMessages, message];
    },
    replaceMessage: (state, action) => {
      const { chatId, tempId, message } = action.payload || {};
      if (!chatId || !message) return;
      const chatKey = String(chatId);
      const existingMessages = state.messagesByChatId[chatKey] || [];
      const hasTemp = existingMessages.some((item) => item.id === tempId);

      state.messagesByChatId[chatKey] = hasTemp
        ? existingMessages.map((item) => (item.id === tempId ? message : item))
        : [...existingMessages, message];
    },
    updateMessageById: (state, action) => {
      const { chatId, messageId, changes } = action.payload || {};
      if (!chatId || !messageId || !changes) return;
      const chatKey = String(chatId);
      const existingMessages = state.messagesByChatId[chatKey] || [];

      state.messagesByChatId[chatKey] = existingMessages.map((item) =>
        item.id === messageId ? { ...item, ...changes } : item,
      );
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
