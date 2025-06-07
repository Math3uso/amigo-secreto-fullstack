import axios from "axios";

export const base = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
});