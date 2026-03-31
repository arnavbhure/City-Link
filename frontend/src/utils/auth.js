export const storeAuthToken = (token, expiresAt) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("authTokenExpiresAt", expiresAt);
};

export const clearStoredAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authTokenExpiresAt");
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const getAuthTokenExpiresAt = () => {
  return localStorage.getItem("authTokenExpiresAt");
};

export const isAuthTokenValid = () => {
  const authTokenExpiresAt = getAuthTokenExpiresAt();
  if (!authTokenExpiresAt) return false;
  if (Date.now() > authTokenExpiresAt) {
    clearStoredAuth();
    return false;
  }
  return true;
};
