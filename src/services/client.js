import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
