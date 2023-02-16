<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

import Navbar from "./components/Navbar.vue";
import Breadcrumbs from "./components/Breadcrumbs.vue";

const username = ref("saddansyah");
</script>

<template>
    <Navbar>
      <template #main-dashboard>
        <RouterLink to="/">Dashboard</RouterLink>
      </template>
      <template #energy-consumption>
        <RouterLink to="/energy-consumption">Energy Consumption</RouterLink>
      </template>
      <template #devices>
        <RouterLink to="/devices">Devices</RouterLink>
      </template>
      <template #about>
        <RouterLink to="/about">About</RouterLink>
      </template>
      <template #user>
        <RouterLink class="flex justify-center items-center" to="/user">{{ username }}<v-icon end icon="mdi-account-outline"></v-icon></RouterLink>
      </template>
    </Navbar>

    <!-- Login and Register Button -->

    <!-- <RouterLink :to="{ name: 'Login' }">Login</RouterLink>
    <RouterLink :to="{ name: 'Register' }">Register</RouterLink> -->

    <RouterView :username="username" />
</template>

<style scoped></style>
