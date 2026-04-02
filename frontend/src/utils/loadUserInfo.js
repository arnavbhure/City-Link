import api from "../api/axios";

const loadUserInfo = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return;
  const response = await api.get("/auth/getUserInfo");
  if (!response.data.success) {
    return;
  }
  return response.data.user;
};

export default loadUserInfo;
