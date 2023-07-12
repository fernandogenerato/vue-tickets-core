import { defineStore } from "pinia";

import TicketService from "../services/TicketService";
export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    refleshTime: 5,
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
    getUser() {
      TicketService.getID(this.authId).then((res) => {
        this.$patch((state) => {
          state.position = res.data.index;
          state.time = res.data.inserted_at;
          state.isActive = res.data.active;
        });
      });
    },
    setLogoff() {
      localStorage.clear();
      this.$reset();
    },
  },
});
