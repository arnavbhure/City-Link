import { io } from "socket.io-client";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VITE_API_URL;

export const socket = io(BASE_URL, {
  autoConnect: false,
});
