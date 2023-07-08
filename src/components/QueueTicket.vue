<template>
  <form v-if="!isActive">
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
    v-if="!isActive"
    @click="enterQueue(this.form.queueId)"
    class="btn btn-primary mb-2"
  >
    Confirm
  </button>
</template>
<script >
import TicketService from "../services/TicketService";
export default {
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      active: false,
      form: {
        queue_id: "",
        user_id: "",
      },
    };
  },

  mounted() {
    this.form.user_id = localStorage.getItem("auth_id");
  },
  methods: {
    enterQueue() {
      TicketService.create(this.form)
        .then((res) => {
          localStorage.setItem("active_queue", "true");
          localStorage.setItem("position_queue", res.data.position);
          localStorage.setItem("position_time", res.data.time);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.$router.push("/home");
        });
    },
  },
};
</script>

