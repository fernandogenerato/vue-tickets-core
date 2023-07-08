<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="ticket.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="ticket.email"
          name="email"
        />
      </div>

      <button @click="save" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <h5>Position {{ ticket.response.position }}</h5>
      <button class="btn btn-success" @click="newForm">Add</button>
    </div>
    <!-- <div>Meu nome é: <input v-model="fotm" /></div> -->
  </div>
</template>

<script>
import TicketService from "../services/TicketService";
export default {
  name: "create ticket",

  data() {
    return {
      fotm: "",
      ticket: {
        name: "",
        email: "",
        response: "",
        published: false,
      },
      submitted: false,
    };
  },
  mounted() {
    if (localStorage.fotm) {
      this.fotm = localStorage.fotm;
    }
  },
  /* 
    examples: watching for changes
  watch: {
    fotm(newname) {
      localStorage.fotm = newname;
    },
  },
  */
  methods: {
    save() {
      var data = {
        email: this.ticket.email,
        name: this.ticket.name,
      };

      TicketService.create(data)
        .then((res) => {
          this.submitted = true;
          this.ticket.response = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newForm() {
      this.submitted = false;
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
