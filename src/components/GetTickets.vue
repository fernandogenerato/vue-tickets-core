<template>
  <div>
    <div class="spinner-border m-5 center" v-if="loading" role="status"></div>
    <div v-if="tickets.length > 0">
      <h1>Tickets na base de dados</h1>
      <table class="table-dark table-sm">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Posição</th>
            <th scope="col">ID</th>
            <th scope="col">Entrada</th>
            <th scope="col">Ativo</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="selectTableRow(t)" v-for="t in this.tickets" :key="t._id">
            <td>{{ t.index }}</td>
            <td>{{ t.user_id }}</td>
            <td>{{ parseDate(t.inserted_at) }}</td>
            <td >{{ t.active}}</td>
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
    selectTableRow(row) {
      console.log(row);
    },
    showAlert() {
      // // Use sweetalert2
      // Swal.fire({
      //   title: "Error!",
      //   text: "Do you want to continue",
      //   icon: "error",
      //   confirmButtonText: "Cool",
      // });
      // this.$swal("Hello Vue world!!!");
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
        .then(() => {
          this.loadTickets();
          // Swal.fire("Check-in feito com sucesso!", "", "success");
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
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
}
tr {
  color: white;
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
