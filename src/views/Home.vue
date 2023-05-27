<template>
    <div class=" h-screen">
        <Navbar :username="username" />

        <div v-if="notify.success">
            <NotifySnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
        </div>
        <div v-else>
            <WarningSnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
        </div>

        <RouterView :username="username" :isDeviceLoading="isDeviceLoading" @notify="emitNotify" />

        <Footer />

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import Pusher from 'pusher-js'

import { Navbar, Footer, NotifySnackbar, WarningSnackbar } from "@/utils/componentLoader";

const username = JSON.parse(localStorage.getItem('user')).name;

const store = useStore();


const isDeviceLoading = ref(false);

// Pre-fetch to put on the vuex store
const fetchDataDevices = async () => {
    try {
        isDeviceLoading.value = true
        await store.dispatch('_fetchDataDevices');
        isDeviceLoading.value = false
    }
    catch (error) {
        emitNotify(true, false, error);
        console.error(error);
    }
};
fetchDataDevices();

// WebSocket
const fetchEvent = () => {
    let pusher = new Pusher('725f787442f74a5259b4', { cluster: 'ap1' });
    pusher.subscribe('usage-channel');
    pusher.bind('new-data', (data) => {
        fetchDataDevices();
    })
}

onMounted(() => {
    fetchEvent();
})


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