<template>
  <div v-if="!this.env.IsActive">
    <form>
      <div class="form-group">
        <input
          v-model="form.queue_id"
          type="text"
          class="form-control"
          id="ticketform"
          placeholder="Digite o codigo da fila..."
        />
        <small id="queueHelp" class="form-text text-muted"
          >We'll never share your code with anyone else.</small
        >
      </div>
    </form>
    <button
      v-if="!apiLoading"
      @click="enterQueue()"
      class="btn btn-primary mb-2"
    >
      Confirm
    </button>
    <div v-else class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script >
import TicketService from "../services/TicketService";
const sweet = require("sweetalert2");
import { useGlobalStore } from "../stores/global";
export default {
  setup() {
    const env = useGlobalStore();
    return {
      env,
    };
  },

  data() {
    return {
      apiLoading: false,
      form: {
        queue_id: "",
        user_id: this.env.authId,
      },
    };
  },

  methods: {
    enterQueue() {
      this.apiLoading = true;

      TicketService.create(this.form, this.env.authToken)
        .then((res) => {
          this.env.$patch((state) => {
            state.time = res.data.time;
            state.position = res.data.position;
            state.isActive = true;
          });
          this.$router.push("/home");
        })
        .catch(() => {
          sweet.fire({
            title: "Erro para entrar na fila!",
            text: "Favor validar o codigo inserido e tentar novamente.",
            icon: "error",
            confirmButtonText: "Fechar",
          });
        })
        .finally(() => (this.apiLoading = false));
    },
  },
};
</script>

