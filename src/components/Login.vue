<template>
  <div>
    <form class="form-signin">
      <img
        class="mb-4"
        src="https://img.icons8.com/clouds/100/enter-2.png"
        width="100"
        height="100"
      />
      <h1 class="h3 mb-3 font-weight-normal">
        Olá, Faça login com o seu e-mail e senha.
      </h1>
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
        autofocus=""
        required
      />
    </form>
    <button
      v-if="!apiLoading"
      @click="login(this.form)"
      class="btn btn-lg btn-primary btn-block"
    >
      Entrar
    </button>

    <button
      v-if="!apiLoading"
      @click="this.signup()"
      class="btn btn-lg btn-primary btn-block"
    >
      Cadastre-se
    </button>
    <div v-else class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>

  <p class="mt-5 mb-3 text-muted">© 2023</p>
</template>
<script>
import AuthService from "../services/AuthService";
const sweet = require("sweetalert2");
import { useGlobalStore } from "../stores/global";
const env = useGlobalStore();
env.$reset();
export default {
  data() {
    return {
      apiLoading: false,
      response: "",
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    showLoginAlert() {
      sweet.fire({
        title: "Error!",
        text: "Favor validar os campos de usuario e senha!",
        icon: "error",
        confirmButtonText: "Fechar",
      });
    },
    login(form) {
      this.apiLoading = true;
      AuthService.login(form)
        .then((res) => {
          env.$patch((state) => {
            state.authToken = res.data.token;
            state.authId = res.data.id;
            state.isAuthenticated = true;
            state.isActive = res.data.active;
            if (res.data.active) {
              state.position = res.data.index;
              state.time = res.data.inserted_at;
            }
          });
          localStorage.setItem("auth_token", res.data.token);
          this.$router.push("/home");
        })
        .catch(() => {
          this.showLoginAlert();
        })
        .finally(() => (this.apiLoading = false));
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
