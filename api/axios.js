import { endpoint } from "./constants";
import axios from "axios";

const instance = axios.create({
  baseURL: endpoint,
});

// Alter defaults after instance has been created
if (process.browser && localStorage.getItem("token")) {
  instance.defaults.headers.common["token"] = localStorage.getItem("token");
}

export default instance;
