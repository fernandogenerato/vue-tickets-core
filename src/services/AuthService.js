import http from "../../http-common.js";

class AuthService {
  login(data) {
    return http.post("/auth/login", data);
  }
  createUser(data) {
    return http.post("/auth/user", data);
  }
}

export default new AuthService();
