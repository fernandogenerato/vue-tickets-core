import http from "../../http-common.js";

class TicketService {

  getActiveTickets(){
    return http.get("/tickets?active=true");

  }
  getAll() {
    return http.get("/tickets");
  }

  create(data) {
    return http.post("/tickets", data);
  }

  check(id){
    return http.post("/tickets/"+ id)
  }

}

export default new TicketService();
