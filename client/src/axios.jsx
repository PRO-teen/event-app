import axios from "axios";

const instance = axios.create({
  baseURL: "https://event-app-wf08.onrender.com",
  withCredentials: true,
});

export default instance;
