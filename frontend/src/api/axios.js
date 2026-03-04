import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL + "/api",
});

export default API;