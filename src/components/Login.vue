<template>
  <form class="form-signin">
    <img
      class="mb-4"
      src="https://img.icons8.com/clouds/100/enter-2.png"
      width="100"
      height="100"
    />
    <h1 class="h3 mb-3 font-weight-normal">Olá, Faz login ai chapa</h1>
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
  <button @click="login(this.form)" class="btn btn-lg btn-primary btn-block">
    Entrar
  </button>
  <button @click="signup()" class="btn btn-lg btn-primary btn-block">
    Cadastre-se
  </button>

  <p class="mt-5 mb-3 text-muted">© 2023</p>
</template>
<script>
import AuthService from "../services/AuthService";
const sweet = require("sweetalert2");
export default {
  data() {
    return {
      form: {
        email: "test@test.com",
        password: "1",
      },
    };
  },

  methods: {
    showAlert() {
      sweet.fire({
        title: "Error!",
        text: "Favor validar os campos de usuario e senha!",
        icon: "error",
        confirmButtonText: "Fechar",
      });
    },
    login(form) {
      AuthService.login(form)
        .then((res) => {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_id", res.headers.get("Id"));
          this.$router.push("/home");
        })
        .catch(() => {
          this.showAlert();
        });
    },
    signup() {
      this.$router.push("/signup");
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
