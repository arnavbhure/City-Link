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
  const expiresAt = localStorage.getItem("authTokenExpiresAt");
  return expiresAt ? Number(expiresAt) : null;
};

export const isAuthTokenValid = () => {
  const token = getAuthToken();
  const authTokenExpiresAt = getAuthTokenExpiresAt();

  if (!token || !authTokenExpiresAt || !Number.isFinite(authTokenExpiresAt)) {
    clearStoredAuth();
    return false;
  }

  if (Date.now() >= authTokenExpiresAt) {
    clearStoredAuth();
    return false;
  }

  return true;
};
