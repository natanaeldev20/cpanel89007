import axios from "axios";

const api = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXTAUTH_URL || "" // en server-side
      : "", // en cliente (navegador) usa rutas relativas
});

export default api;
