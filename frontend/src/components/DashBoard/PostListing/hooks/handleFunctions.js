import { useState } from "react";
import { initialForm } from "../constants/postListingConstants";
import PostingHouseListing from "../../../../api/PostingHouseListing/PostingHouseListing";
import { useSelector } from "react-redux";

export const useHandleFunctions = () => {
  const owner_id = useSelector((state) => state.user.id);
  const [formData, setFormData] = useState(initialForm);
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSubmitState("idle");
    setSubmitMessage("");
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");
    try {
      const response = await PostingHouseListing({ formData, owner_id });
      if (response?.success) {
        setSubmitState("success");
        setSubmitMessage(response.message || "Listing published successfully.");
      } else {
        setSubmitState("error");
        setSubmitMessage(response?.message || "Failed to post the listing.");
      }
    } catch {
      setSubmitState("error");
      setSubmitMessage("Failed to post the listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    submitState,
    submitMessage,
    isSubmitting,
    setSubmitState,
  };
};
