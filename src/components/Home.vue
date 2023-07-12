<template>
  <div v-if="this.env.IsActive">
    <h1>Olá,</h1>
    <h3 v-if="this.env.position == 1">É a sua vez !</h3>
    <h3 v-else>Você está em {{ this.env.position }}º na fila</h3>
    <h6>Horario que entrou na fila: {{ this.env.time }}</h6>
    <button
      @click="this.env.exitQueue"
      class="btn btn-lg btn-primary btn-block"
    >
      Sair da fila.
    </button>
  </div>

  <queue-ticket v-else></queue-ticket>
</template>   
<script>
import { useGlobalStore } from "../stores/global";
import QueueTicket from "./QueueTicket.vue";
export default {
  components: { QueueTicket },
  data() {
    return {
      intervalID: null,
    };
  },
  setup() {
    const env = useGlobalStore();
    return {
      env,
    };
  },

  mounted() {
    if (this.env.IsActive && this.env.position != 1) {
      this.intervalID = setInterval(() => {
        this.env.getUser();
      }, 61000);
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId); // Cancela o intervalo antes de destruir o componente
  },
};
</script>
<style>
</style>
    
 