import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("./components/Signup"),
  },
  {
    path: "/login",
    name: "Login",
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
router.beforeEach(async (to) => {
  const token = localStorage.getItem("auth_token");
  const tokenIsEmpty = token == null || token == undefined;
  if (tokenIsEmpty && to.name != "Login") {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("id");
    return { name: "Login" };
  }
});
export default router;
