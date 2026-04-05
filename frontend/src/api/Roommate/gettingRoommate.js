import { useSelector } from "react-redux";
import api from "../axios";
import { useNavigate } from "react-router-dom";

const gettingRoommate = async (city) => {
  try {
    const user_id = useSelector((state) => state.user.id);
    const navigate = useNavigate();
    if (!user_id) {
      navigate("/login");
      return;
    }
    const response = await api.get("/getting-roommate", { city, user_id });
    return response.data;
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || "Something went wrong",
    };
  }
};

export default gettingRoommate;
