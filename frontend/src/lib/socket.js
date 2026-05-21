import { io } from "socket.io-client";

const getSocketUrl = () => {
  if (import.meta.env.VITE_SOCKET_URL) {
    return import.meta.env.VITE_SOCKET_URL;
  }

  if (import.meta.env.MODE === "development") {
    return "http://localhost:3000";
  }

  const apiUrl = new URL(import.meta.env.VITE_API_URL);
  apiUrl.pathname = apiUrl.pathname.replace(/\/api\/?$/, "");
  apiUrl.search = "";
  apiUrl.hash = "";

  return apiUrl.toString().replace(/\/$/, "");
};

export const socket = io(getSocketUrl(), {
  autoConnect: false,
  withCredentials: true,
  transports: ["polling", "websocket"],
});
