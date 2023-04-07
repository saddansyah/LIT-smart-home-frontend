<template>
    <Navbar>
        <template #main-dashboard>
            <RouterLink to="/">Main Dashboard</RouterLink>
        </template>
        <template #energy-consumption>
            <RouterLink to="/energy-consumption">Energy Consumption</RouterLink>
        </template>
        <template #devices>
            <RouterLink to="/devices" :class="route.fullPath.includes('devices') && 'router-link-exact-active'">Devices
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
    
    <RouterView :username="username" :isDeviceLoading="isDeviceLoading" />

    <Footer />
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useStore } from "vuex";

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const username = JSON.parse(localStorage.getItem('user')).name;

const store = useStore();
const route = useRoute();

const isDeviceLoading = ref(false);

// Pre-fetch to put on the vuex store
(async function fetchDataDevices() {
    try {
        isDeviceLoading.value = true
        await store.dispatch('_fetchDataDevices');
        isDeviceLoading.value = false
    }
    catch (error) {
        alert(error);
        console.error(error);
    }
})();


</script>