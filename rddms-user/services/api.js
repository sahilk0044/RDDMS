import axios from "axios";

const API = axios.create({
  baseURL: "http://10.151.64.147:8000/api",
});

export default API;