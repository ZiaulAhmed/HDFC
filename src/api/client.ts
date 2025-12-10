import axios from "axios";

// Backend ka base URL .env se (ya fallback localhost:)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

// simple example: session create API
export const createSession = (payload: any = {}) =>
  api.post("/sessions", payload).then((r: any) => r.data);
