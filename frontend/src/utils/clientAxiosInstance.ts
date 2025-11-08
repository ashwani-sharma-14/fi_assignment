import axios from "axios";
export const clientAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
