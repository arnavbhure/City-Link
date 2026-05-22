import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getChatMessages from "../../../api/chat/getChatMessages";
import { chatActions } from "../../../store/chat/chatSlice";
import { selectMessagesByChatId } from "../../../store/chat/chatSelectors";
import { mapMessage } from "../utils/chatHelpers";

const useChatMessages = ({ selectedChatId, currentUserId }) => {
  const dispatch = useDispatch();
  const messagesByChatId = useSelector(selectMessagesByChatId);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    if (!selectedChatId) return;

    let isActive = true;
    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const response = await getChatMessages(selectedChatId);
        const messages = Array.isArray(response?.messages)
          ? response.messages.map((message) =>
              mapMessage(message, currentUserId),
            )
          : [];

        if (!isActive) return;

        dispatch(
          chatActions.setMessagesForChat({
            chatId: selectedChatId,
            messages,
          }),
        );
        dispatch(chatActions.markChatRead(selectedChatId));
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      } finally {
        if (isActive) {
          setLoadingMessages(false);
        }
      }
    };

    fetchMessages();

    return () => {
      isActive = false;
    };
  }, [selectedChatId, currentUserId, dispatch]);

  return { messagesByChatId, loadingMessages };
};

export default useChatMessages;
