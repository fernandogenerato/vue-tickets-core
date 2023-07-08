import http from "../../http-common.js";
const config = {
  headers: { Authorization: localStorage.getItem("auth_token") },
};
class AuthService {
  login(data) {
    return http.post("/auth/login", data);
  }
  validateToken() {
    return http.get("/auth/token", config);
  }
   createUser(data) {
    return  http.post("/auth/user", data);
  }
}

export default new AuthService();
