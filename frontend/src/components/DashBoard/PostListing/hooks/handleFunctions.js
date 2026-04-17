import { useState } from "react";
import { initialForm } from "../constants/postListingConstants";
import PostingHouseListing from "../../../../api/PostingHouseListing/PostingHouseListing";

export const useHandleFunctions = () => {
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
    const owner_id = useSelector((state) => state.user.id);
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");
    console.log("Form data to submit:", formData);
    try {
      const response = await PostingHouseListing({ formData, owner_id });
      if (response.success) {
        setSubmitState("success");
        setSubmitMessage(response.message || "Listing published successfully.");
        return;
      }
    } catch {
      setSubmitState("error");
      setSubmitMessage("Failed to post the listing.");
      return;
    }
    setIsSubmitting(false);
    setSubmitState("error");
    setSubmitMessage("Failed to post the listing.");
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
