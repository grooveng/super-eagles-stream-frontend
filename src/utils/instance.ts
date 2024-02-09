import axios from "axios";

let token: string | null = "";

if (typeof window !== "undefined") {
  token = localStorage.getItem("accessToken") || "";
}

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  },
});
