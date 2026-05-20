import { io } from "socket.io-client";

const VITE_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : import.meta.env.VITE_API_URL;
console.log("Environment Mode:", import.meta.env.MODE);
console.log("Socket BASE_URL:", VITE_API_URL);
export const socket = io(VITE_API_URL, {
  autoConnect: false,
});
