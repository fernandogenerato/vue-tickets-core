<template>
  <div>
    <div class="spinner-border m-5 center" v-if="loading" role="status"></div>
    <div v-if="tickets.length > 0">
      <table class="table table-bordered table-sm">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Posição</th>
            <th scope="col">Nome</th>
            <th scope="col">Entrada</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in this.tickets" :key="t._id">
            <td>{{ t.index }}</td>
            <td>{{ t.name }}</td>
            <td>{{ parseDate(t.inserted_at) }}</td>
            <td>
              <button
                @click="checkItem(t._id)"
                type="button"
                class="btn btn-success"
              >
                Checkin
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h4 v-if="!loading">A fila está vazia !</h4>
    </div>
  </div>
</template>

<script>
import TicketService from "../services/TicketService";
import moment from "moment";
export default {
  name: "tickets list",
  mounted() {
    this.loadTickets();
  },

  data() {
    return {
      loading: false,
      payload: [],
      tickets: "",
    };
  },
  methods: {
    parseDate(v) {
      return moment(v).format("LT");
    },

    loadTickets() {
      (this.loading = true),
        TicketService.getActiveTickets()
          .then((res) => {
            this.tickets = res.data;
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            this.loading = false;
          });
    },

    checkItem(id) {
      TicketService.check(id)
        .then((res) => {
          console.log(res);
          this.loadTickets();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
tr,
h4 {
  text-align: center;
}
tr:hover {
  background-color: rgb(225, 255, 224);
}

.submit-form {
  max-width: 300px;
  margin: auto;
}

.loader {
  /* Loader Div Class */
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: #eceaea;
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10000000;
  opacity: 0.4;
  filter: alpha(opacity=40);
}
</style>
