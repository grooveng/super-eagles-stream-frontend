import axios from "axios";

let token: string | null = "";

if (typeof window !== "undefined") {
  token = localStorage.getItem("accessToken") || "";
}

export const socketInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOCKET_API_URI,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  },
});



export const wordpressInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HELPDESK_URL,
  headers: {},
});

export const uploadInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
    Authorization: `${token}`,
  },
});
