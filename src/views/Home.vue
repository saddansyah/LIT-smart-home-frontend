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

    <div v-if="notify.success">
        <NotifySnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
    </div>
    <div v-else>
        <WarningSnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
    </div>
    
    <RouterView :username="username" :isDeviceLoading="isDeviceLoading" @notify="emitNotify"/>

    <Footer />
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useStore } from "vuex";
import { Navbar, Footer, NotifySnackbar, WarningSnackbar } from "@/utils/componentLoader";

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
        emitNotify(true, false, error);
        console.error(error);
    }
})();

// Snackbars
const notify = ref({
    state: false,
    success: false,
    message: ''
});

const emitNotify = (state, success, message) => {
    notify.value.state = state;
    notify.value.success = success;
    notify.value.message = message;
}



</script>