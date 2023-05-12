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
        <label for="document">Document</label>
        <input
          class="form-control"
          id="document"
          required
          v-model="ticket.document"
          name="document"
        />
      </div>
      <button @click="save" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <h5>Position {{ticket.response.position}}</h5>     
      <button class="btn btn-success" @click="newForm">Add</button>
    </div>
  </div>
</template>

<script>
import TicketService from "../services/TicketService";
export default {
  name: "create ticket",
  data() {
    return {
      ticket: {
        name: "",
        document: "",
        response:"",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    save() {
      var data = {
        document: this.ticket.document,
        name: this.ticket.name,
      };

      TicketService.create(data)
        .then((res) => {
          this.submitted = true;
          this.ticket.response =res.data;
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
