<template>
  <div v-if="this.env.IsActive">
    <h1>Olá,</h1>
    <h3 v-if="this.env.position == 1">É a sua vez !</h3>
    <h3 v-else>Você está em {{ this.env.position }}º na fila</h3>
    <h6>Horario que entrou na fila: {{ this.env.time }}</h6>
    <button
      v-if="!apiLoading"
      @click="this.exitQueue()"
      class="btn btn-lg btn-primary btn-block"
    >
      Sair da fila.
    </button>
    <div v-else class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>

  <queue-ticket v-else></queue-ticket>
</template>   
<script>
import { useGlobalStore } from "../stores/global";
import QueueTicket from "./QueueTicket.vue";
const sweet = require("sweetalert2");
import TicketService from "../services/TicketService";

export default {
  components: { QueueTicket },
  data() {
    return {
      apiLoading: false,
      intervalID: null,
    };
  },
  setup() {
    const env = useGlobalStore();
    return {
      env,
    };
  },
  methods: {
    exitQueue() {
      this.apiLoading = true;
      TicketService.check(this.env.authId)
        .then(() => {
          this.env.$patch((state) => {
            state.isActive = false;
          });
        })
        .catch(() => {
          sweet.fire({
            title: "Erro para sair da fila!",
            icon: "error",
            confirmButtonText: "Fechar",
          });
        })
        .finally(() => (this.apiLoading = false));
    },
  },
  mounted() {
    if (this.env.IsActive && this.env.position != 1) {
      this.intervalID = setInterval(() => {
        this.env.getUser();
      }, 16000);
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId); // Cancela o intervalo antes de destruir o componente
  },
};
</script>
<style>
</style>
    
 