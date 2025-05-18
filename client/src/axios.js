// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://event-app-wf08.onrender.com", // your backend URL
  withCredentials: true, // if you're using cookies/session
});

export default instance;
