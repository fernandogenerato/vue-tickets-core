import http from "../../http-common.js";
const config = {
  headers: { Authorization: localStorage.getItem("auth_token") },
};
class TicketService {
  getActiveTickets() {
    return http.get("/tickets?active=true", config);
  }
  getAll() {
    return http.get("/tickets", config);
  }

  getID(id) {
    return http.get("/tickets/" + id, config);
  }

  create(data) {
    return http.post("/tickets", data, config);
  }

  check(id) {
    return http.post("/tickets/" + id, "",  config);
  }
}

export default new TicketService();
