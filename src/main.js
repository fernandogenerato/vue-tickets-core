import { createApp } from "vue";

import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Registra os ícones que você deseja usar
library.add(fas);

// Registra o componente FontAwesomeIcon globalmente

const pinia = createPinia();
pinia.use(persist);
const app = createApp(App).use(router).use(pinia).use(VueSweetalert2, {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
});
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");
