import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://10.100.149.147:8000/api",
});

API.interceptors.request.use(async (req) => {
  const token = await AsyncStorage.getItem("token");

  console.log("Sending token:", token); // 👈 DEBUG

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;