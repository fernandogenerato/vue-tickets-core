import { createWebHistory, createRouter } from "vue-router";

const routes = [
  // {
  //   path: "/",
  //   alias: "/tutorials",
  //   name: "tutorials",
  //   component: () => import("./components/TutorialsList")
  // },
  {
    path: "/admin",
    name: "tutorial-details",
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

export default router;
