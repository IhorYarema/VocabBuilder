import axios from "axios";

const api = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api",
  headers: { "Content-Type": "application/json" },
});

export default api;
