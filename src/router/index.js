import { createRouter, createWebHistory } from "vue-router";

// Plate for logged in view
import Home from "@/views/Home.vue";

// Importing views using import mapping
import MainDashboard from "@/views/MainDashboard.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import EnergyConsumptionView from "@/views/EnergyConsumptionView.vue";
import DevicesView from "@/views/DevicesView.vue";
import DeviceDetailsView from "@/views/DeviceDetailsView.vue"
import UserView from "@/views/UserView.vue";
import NotFound from "@/views/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "",
          redirect: "main-dashboard"
        },
        {
          path: "main-dashboard",
          name: "Main Dashboard",
          component: MainDashboard,
        },
        {
          path: "about",
          name: "About",
          component: AboutView,
        },
        {
          path: "energy-consumption",
          name: "Energy Consumption",
          component: EnergyConsumptionView,
        },
        {
          path: "devices",
          name: "Devices",
          component: DevicesView,
        },
        {
          path: "devices/:deviceId",
          name: "Device Details",
          component: DeviceDetailsView,
          props: true,
        },
        {
          path: "user",
          name: "User",
          component: UserView,
          props: true
        },
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    }
  ],
});


export default router;
