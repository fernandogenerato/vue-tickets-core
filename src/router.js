import { createWebHistory, createRouter } from "vue-router";
const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/signup",
    name: "signup",
    component: () => import("./components/Signup"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/Login"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("./components/Home"),
  },
  {
    path: "/admin",
    component: () => import("./components/GetTickets"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTicket"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
import { useGlobalStore } from "./stores/global";
router.beforeEach(async (to) => {
  const global = useGlobalStore();
  if (!global.IsLogged && to.name != "login" && to.name != "signup") {
    return { name: "login" };
  }
});
export default router;
