import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getSidebarUsers from "../../../api/chat/getSidebarUsers";
import { chatActions } from "../../../store/chat/chatSlice";
import { selectChatContacts } from "../../../store/chat/chatSelectors";
import { normalizeContact } from "../utils/chatHelpers";

const useChatContacts = () => {
  const dispatch = useDispatch();
  const chatContacts = useSelector(selectChatContacts);
  const [loadingContacts, setLoadingContacts] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoadingContacts(true);
      try {
        const response = await getSidebarUsers();
        const contacts = Array.isArray(response?.data)
          ? response.data.map(normalizeContact)
          : [];
        dispatch(chatActions.setContacts(contacts));
      } catch (error) {
        console.error("Error fetching chat contacts:", error);
      } finally {
        setLoadingContacts(false);
      }
    };

    fetchContacts();
  }, [dispatch]);

  return { chatContacts, loadingContacts };
};

export default useChatContacts;
