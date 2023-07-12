<template>
  <div v-if="!apiLoading">
    <form class="form-signin">
      <img
        class="mb-4"
        src="https://img.icons8.com/clouds/100/enter-2.png"
        width="100"
        height="100"
      />
      <h1 class="h3 mb-3 font-weight-normal">
        Olá, Faça o seu cadastro abaixo.
      </h1>
      <label for="inputName" class="sr-only">Nome</label>
      <input
        v-model="form.name"
        type="name"
        id="inputName"
        class="form-control"
        placeholder="Nome"
        required
      />
      <label for="inputEmail" class="sr-only">E-mail</label>
      <input
        v-model="form.email"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="E-mail"
        autofocus=""
        required
      />

      <label for="inputPassword" class="sr-only">Password</label>
      <input
        v-model="form.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Senha"
        required
      />
    </form>
    <button @click="signup(form)" class="btn btn-lg btn-primary btn-block">
      Cadastre-se
    </button>
    <button @click="backToLogin()" class="btn btn-lg btn-primary btn-block">
      Voltar
    </button>
  </div>
  <div v-else class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <p class="mt-5 mb-3 text-muted">© 2023</p>
</template>
<script>
import AuthService from "../services/AuthService";
const sweet = require("sweetalert2");
export default {
  data() {
    return {
      apiLoading: false,
      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    showErrorAlert(cause) {
      sweet.fire({
        title: "Error!",
        text: cause,
        icon: "error",
        confirmButtonText: "Fechar",
      });
    },

    showAlert() {
      sweet.fire({
        title: "Error!",
        text: "Favor preencher todos os campos",
        icon: "error",
        confirmButtonText: "Fechar",
      });
    },
    signup(form) {
      this.apiLoading = true;
      AuthService.createUser(form)
        .then(() => {
          sweet.fire("Sucesso!", "Cadastro realizado!", "success");
          this.$router.push("/login");
        })
        .catch((err) => {
          switch (err.response.status) {
            case 400:
              this.showErrorAlert("Favor validar os campos do formulario!");
              break;
            case 409:
              this.showErrorAlert("Usuario já existe no sistema!");
              break;
            default:
              this.showAlert();
          }
        })
        .finally(() => (this.apiLoading = false));
    },
    backToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
</style>
