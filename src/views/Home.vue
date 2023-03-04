<template>
    <Navbar>
        <template #main-dashboard>
            <RouterLink to="/">Main Dashboard</RouterLink>
        </template>
        <template #energy-consumption>
            <RouterLink to="/energy-consumption">Energy Consumption</RouterLink>
        </template>
        <template #devices>
            <RouterLink to="/devices" :class="route.fullPath.includes('devices') && 'router-link-active'">Devices
            </RouterLink>
        </template>
        <template #about>
            <RouterLink to="/about">About</RouterLink>
        </template>
        <template #user>
            <RouterLink class="flex justify-center items-center" to="/user">{{ username }}<v-icon end
                    icon="mdi-account-outline"></v-icon></RouterLink>
        </template>
    </Navbar>

    <RouterView :username="username" />

    <Footer />
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const username = ref("saddansyah");

const route = useRoute();
</script>