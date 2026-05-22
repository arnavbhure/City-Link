import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../../lib/socket";
import { chatActions } from "../../../store/chat/chatSlice";
import {
  buildLastMessageMeta,
  formatMessageTime,
  mapMessage,
} from "../utils/chatHelpers";

const useChatSocket = ({ selectedChatId, currentUserId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  const handleIncomingMessage = useCallback(
    (payload) => {
      const incoming = payload?.message;
      if (!incoming) return;

      const senderId = incoming.sender_id;
      const senderKey = String(senderId);
      const isActiveChat =
        selectedChatId && String(selectedChatId) === String(senderId);

      dispatch(
        chatActions.appendMessage({
          chatId: senderKey,
          message: mapMessage(incoming, currentUserId),
        }),
      );

      dispatch(
        chatActions.applyIncomingContactUpdate({
          chatId: senderId,
          meta: buildLastMessageMeta(incoming.message, incoming.created_at),
          isActive: isActiveChat,
        }),
      );

      if (isActiveChat) {
        socket.emit("chat:read", { otherUserId: senderId });
      }
    },
    [selectedChatId, currentUserId, dispatch],
  );

  useEffect(() => {
    socket.on("chat:message", handleIncomingMessage);

    return () => {
      socket.off("chat:message", handleIncomingMessage);
    };
  }, [handleIncomingMessage]);

  const sendMessage = useCallback(
    (receiverId, text) => {
      const trimmedText = typeof text === "string" ? text.trim() : "";
      if (!receiverId || !trimmedText) return;

      const tempId = `temp-${Date.now()}`;
      const optimisticMessage = {
        id: tempId,
        sender: "me",
        text: trimmedText,
        time: formatMessageTime(new Date().toISOString()),
        status: "Sending",
      };

      const receiverKey = String(receiverId);

      dispatch(
        chatActions.appendMessage({
          chatId: receiverKey,
          message: optimisticMessage,
        }),
      );

      dispatch(
        chatActions.updateContact({
          chatId: receiverKey,
          changes: {
            ...buildLastMessageMeta(trimmedText),
            unreadCount: 0,
          },
        }),
      );

      if (!socket.connected) {
        socket.connect();
      }

      socket.emit(
        "chat:send",
        { receiverId, message: trimmedText, tempId },
        (response) => {
          if (!response?.ok) {
            dispatch(
              chatActions.updateMessageById({
                chatId: receiverKey,
                messageId: tempId,
                changes: { status: "Failed" },
              }),
            );
            return;
          }

          const savedMessage = response.message;
          const mappedMessage = mapMessage(savedMessage, currentUserId);

          dispatch(
            chatActions.replaceMessage({
              chatId: receiverKey,
              tempId,
              message: mappedMessage,
            }),
          );

          dispatch(
            chatActions.updateContact({
              chatId: receiverKey,
              changes: {
                ...buildLastMessageMeta(
                  savedMessage.message,
                  savedMessage.created_at,
                ),
                unreadCount: 0,
              },
            }),
          );
        },
      );
    },
    [dispatch, currentUserId],
  );

  return { sendMessage };
};

export default useChatSocket;
