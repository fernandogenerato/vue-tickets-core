import axios from "axios";

export default axios.create({
   baseURL: "https://go-tickets-core.onrender.com",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json"
  }
});

