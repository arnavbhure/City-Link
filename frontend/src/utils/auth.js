const AUTH_STORAGE_KEY = "citylink-auth";

export const getStoredAuth = () => {
  try {
    const auth = localStorage.getItem(AUTH_STORAGE_KEY);
    return auth ? JSON.parse(auth) : null;
  } catch {
    return null;
  }
};

export const setStoredAuth = (authData) => {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token: authData.token,
      expiresAt: authData.expiresAt,
      user: authData.user,
    }),
  );
};

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = () => {
  const auth = getStoredAuth();

  if (!auth?.token || !auth?.expiresAt) {
    return false;
  }

  const isExpired = new Date(auth.expiresAt).getTime() <= Date.now();
  if (isExpired) {
    clearStoredAuth();
    return false;
  }

  return true;
};
