import { defineStore } from "pinia";

import TicketService from "../services/TicketService";
const sweet = require("sweetalert2");
export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    isActive: false,
    isAuthenticated: false,
    authToken: "",
    authId: "",
    position: "",
    time: "",
  }),

  persist: {
    storage: localStorage,
  },

  getters: {
    IsLogged() {
      return this.isAuthenticated;
    },
    IsActive() {
      return this.isActive;
    },
  },
  actions: {
    setLogoff() {
      localStorage.clear();
      this.$reset();
    },
    getUser() {
      TicketService.getID(this.authId).then((res) => {
        if (res.data.active) {
          this.$patch((state) => {
            state.position = res.data.index;
            state.time = res.data.inserted_at;
            state.isActive = res.data.active;
          });
        }
      });
    },
    exitQueue() {
      TicketService.check(this.authId)
        .then(() => {
          this.$patch((state) => {
            state.isActive = false;
          });
        })
        .catch(() => {
          sweet.fire({
            title: "Erro para sair da fila!",
            icon: "error",
            confirmButtonText: "Fechar",
          });
        });
    },
  },
});
