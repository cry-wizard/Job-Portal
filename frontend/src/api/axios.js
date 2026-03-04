import axios from "axios";

const API = axios.create({
//   baseURL: import.meta.env.VITE_BACK_URL + "/api",
  baseURL: "http://localhost:3000/api",

});

export default API;