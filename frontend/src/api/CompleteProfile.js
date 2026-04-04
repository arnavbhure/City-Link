import api from "./axios";

const CompleteProfile = async (formData) => {
  console.log("formdata came after submission : ", formData);
  //   try {
  //     const response = await api.post("/complete-profile", formData);
  //   } catch (error) {
  //     const message = repsonse.data.message || "Profile Completion Failed";
  //     throw new Error(message);
  //   }
};

export default CompleteProfile;
