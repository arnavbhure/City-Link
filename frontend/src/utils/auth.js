export const clearStoredAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authTokenExpiresAt");
};
