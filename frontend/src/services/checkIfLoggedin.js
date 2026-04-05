import jwtTokenVerify from "../api/jwtTokenverify";
import { clearStoredAuth, getAuthToken } from "../utils/auth";
import { isAuthTokenValid } from "../utils/auth";

const checkifLoggedIn = async () => {
  if (!isAuthTokenValid()) {
    return false;
  }
  const token = getAuthToken();
  const response = await jwtTokenVerify(token);
  if (response.success) {
    return true;
  }
  clearStoredAuth();
  return false;
};

export const checkIfTokenValid = async () => {
  if (!isAuthTokenValid()) {
    return { success: false, user: null };
  }
  const token = getAuthToken();
  const response = await jwtTokenVerify(token);
  if (!response.success) {
    clearStoredAuth();
    return { success: false, user: null };
  }
  return response;
};

export default checkifLoggedIn;
