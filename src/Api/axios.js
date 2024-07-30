import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/proj-bc0df/us-central1/api",
  baseURL: "https://amazon-backend-3b2b.onrender.com",
  // baseURL: "http://localhost:5001",
});

export {axiosInstance};