import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_API_URI || "";
const URL_DEF = process.env.NEXT_PUBLIC_API_URI || "";

export const socket = io(URL);
export const socketDef = io(URL_DEF);
