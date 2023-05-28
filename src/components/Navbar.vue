<template>
  <nav class="bg-slate-800 fixed top-0 right-0 left-0 z-10">
    <div class="container p-4 flex flex-wrap items-center justify-between mx-auto">
      <a href="/" class="flex items-center md:mb-4 lg:mb-0">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap text-white">Smart Home</span>
      </a>

      <v-menu>
        <template v-slot:activator="{ props }">
          <button data-collapse-toggle="navbar-default" type="button" v-bind="props" v-ripple
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden">
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </template>

        <v-list density="compact" bg-color="#334155 " class="text-white">
          <v-list-item v-for="(item, id) in navbarItems" :key="id" :value="item.value">
            <RouterLink  :to="item.path">{{ item.title }}</RouterLink>
          </v-list-item>
        </v-list>
      </v-menu>


      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="flex flex-col rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-base">
          <li>
            <a
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 text-gray-300 md:hover:text-white hover:text-white md:hover:bg-transparent">
              <RouterLink :to="navbarItems[0].path">{{ navbarItems[0].title }}</RouterLink>
            </a>
          </li>
          <li>
            <span
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 text-gray-300 md:hover:text-white hover:text-white md:hover:bg-transparent">
              <RouterLink :to="navbarItems[1].path">{{ navbarItems[1].title }}</RouterLink>
            </span>
          </li>
          <li>
            <span
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 text-gray-300 md:hover:text-white hover:text-white md:hover:bg-transparent">
              <RouterLink :to="navbarItems[2].path" :class="route.fullPath.includes('devices') && 'router-link-exact-active'">{{ navbarItems[2].title }}
              </RouterLink>
            </span>
          </li>
          <li>
            <span
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 text-gray-300 md:hover:text-white hover:text-white md:hover:bg-transparent">
              <RouterLink :to="navbarItems[3].path">{{ navbarItems[3].title }}</RouterLink>
            </span>
          </li>
          <li>
            <v-chip class="user-button hover:font-bold hover:bg-blue-900" size="large" color="blue-darken-1"
              variant="outlined">
              <RouterLink class="flex justify-center items-center" :to="navbarItems[4].path">{{ username }}<v-icon end
                  icon="mdi-account-outline"></v-icon></RouterLink>
            </v-chip>
          </li>
        </ul>
      </div>
    </div>
    <Breadcrumbs />
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Breadcrumbs from "./Breadcrumbs.vue";

const { username } = defineProps(['username']);
const route = useRoute();

const navbarItems = ref([
  { title: 'Main Dashboard', value: 'mainDashboard', path: '/' },
  { title: 'Energy Consumption', value: 'energyConsumption', path: '/energy-consumption' },
  { title: 'Devices', value: 'devices', path: '/devices' },
  { title: 'About', value: 'about', path: '/about' },
  { title: 'User', value: 'user', path: '/user' },
])

</script>
