import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

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
      meta: {
        title: "Login to Smart Home | Smart Home"
      }
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
      meta: {
        title: "Register to Smart Home | Smart Home"
      }
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "main-dashboard",
          redirect: ""
        },
        {
          path: "",
          name: "Main Dashboard",
          component: MainDashboard,
          meta: {
            title: "Main Dashboard | Smart Home"
          }
        },
        {
          path: "about",
          name: "About",
          component: AboutView,
          meta: {
            title: "About | Smart Home"
          }
        },
        {
          path: "energy-consumption",
          name: "Energy Consumption",
          component: EnergyConsumptionView,
          meta: {
            title: "Energy Consumption | Smart Home"
          }
        },
        {
          path: "devices",
          name: "Devices",
          component: DevicesView,
          meta: {
            title: "Devices | Smart Home"
          },
        },
        {
          path: "devices/:deviceId",
          name: "Device Details",
          component: DeviceDetailsView,
          meta: {
            title: "Device | Smart Home"
          }
        },
        {
          path: "user",
          name: "User",
          component: UserView,
          props: true,
          meta: {
            title: "User | Smart Home"
          }
        },
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: "Not Found :( | Smart Home"
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});



export default router;
