import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:8001/";
const instance = axios.create({
  baseURL: BACKEND_URL,
});

export default instance;
