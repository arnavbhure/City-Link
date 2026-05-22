import jwtTokenVerify from "../api/jwtTokenverify";
import { clearStoredAuth } from "../utils/auth";

const checkifLoggedIn = async () => {
  const response = await jwtTokenVerify();
  if (response.success) {
    return true;
  }
  clearStoredAuth();
  return false;
};

export const checkIfTokenValid = async () => {
  const response = await jwtTokenVerify();
  if (!response.success) {
    clearStoredAuth();
    return { success: false, user: null };
  }
  return response;
};

export default checkifLoggedIn;
