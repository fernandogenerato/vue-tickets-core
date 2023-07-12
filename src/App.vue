<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/home" class="navbar-brand">App</router-link>
      <div
        v-if="global.isAuthenticated && this.$route.name != 'login'"
        class="navbar-nav mr-auto"
      >
        <li class="nav-item">
          <router-link to="/admin" class="nav-link"> $root</router-link>
        </li>
      </div>
      <div class="navbar-nav mr-auto"></div>
      <button
        v-if="global.isAuthenticated && this.$route.name != 'login'"
        @click="this.Logout()"
        type="button"
        class="btn btn-outline-light"
      >
        Deslogar
      </button>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<script>
import { useGlobalStore } from "../src/stores/global.js";
export default {
  name: "app",
  setup() {
    const global = useGlobalStore();
    return { global };
  },

  methods: {
    Logout() {
      this.global.setLogoff();
      this.$router.push("/login");
    },
  },
};
</script>
