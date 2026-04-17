import { useState } from "react";
import { initialForm } from "../constants/postListingConstants";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");
    console.log("Form data to submit:", formData);
    setIsSubmitting(false);
    setSubmitState("success");
    setSubmitMessage("Listing published successfully." || response.message);
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
