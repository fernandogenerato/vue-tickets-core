import axios from "axios";

export default axios.create({
  baseURL: "https://go-tickets-core.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});
