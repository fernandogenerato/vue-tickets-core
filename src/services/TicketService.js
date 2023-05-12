import http from "../../http-common.js";

class TicketService {
  getAll() {
    return http.get("/tickets");
  }

  create(data) {
    return http.post("/tickets", data);
  }


}

export default new TicketService();
