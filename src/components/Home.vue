<template>
  <QueueTicket :isActive="this.active"> </QueueTicket>
  <div v-if="this.active">
    <h1>Olá</h1>
    <h3>Sua Posição na fila: {{ this.position }}</h3>
    <h4>Horario que entrou na fila: {{ this.parseDate(this.time) }}</h4>
    <button @click="exitQueue()" class="btn btn-lg btn-primary btn-block">
      Sair
    </button>
  </div>
</template>   
<script>
import TicketService from "../services/TicketService";
import QueueTicket from "./QueueTicket.vue";
import moment from "moment";

export default {
  components: { QueueTicket },
  mounted() {
    this.id = localStorage.getItem("auth_id");
    TicketService.getID(this.id).then((res) => {
      if (res.data.active == true) {
        this.position = res.data.index;
        this.time = res.data.inserted_at;
        this.active = true;
        this.$router.push("/home");
      }
    });
  },

  methods: {
    reset() {
      (this.index = ""),
        (this.position = ""),
        (this.time = ""),
        (this.id = ""),
        (this.active = false);
    },
    exitQueue() {
      TicketService.check(this.id).then(() => {
        localStorage.setItem("active_queue", "false");
        this.reset();
        this.$router.push("/home");
      });
    },
    parseDate(v) {
      return moment(v).format("LT");
    },
  },
  data() {
    return {
      index: "",
      position: "",
      time: "",
      id: "",
      active: false,
    };
  },
};
</script>
    
<style>
</style>
    
 