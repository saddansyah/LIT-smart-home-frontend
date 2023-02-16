import { createRouter, createWebHistory } from "vue-router";

// Importing views using import mapping
import MainDashboard from "@/views/MainDashboard.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import EnergyConsumptionView from "@/views/EnergyConsumptionView.vue";
import DevicesView from "@/views/DevicesView.vue";
import UserView from "@/views/UserView.vue";
import HiddenView from "@/views/HiddenView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      // name: "Home",
      components: {
        default: MainDashboard,
        HiddenView: HiddenView
      },
    },
    {
      path: "/about",
      name: "About",
      component: AboutView,
    },
    {
      path: "/energy-consumption",
      name: "Energy Consumption",
      component: EnergyConsumptionView,
    },
    {
      path: "/devices",
      name: "Devices",
      component: DevicesView,
    },
    {
      path: "/user",
      name: "User",
      component: UserView,
      props: true
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
  ],
});

export default router;
