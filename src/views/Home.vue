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

const username = JSON.parse(sessionStorage.getItem('user')).name;

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

// WebSocket (Pusher)
const pusherKey = import.meta.env.VITE_APP_PUSHER_KEY;
const pusherCluster = import.meta.env.VITE_APP_PUSHER_CLUSTER;
const pusherChannel = import.meta.env.VITE_APP_PUSHER_CHANNEL;
const pusherEvent = import.meta.env.VITE_APP_PUSHER_EVENT;

const fetchEvent = () => {
    let pusher = new Pusher(pusherKey, { cluster: pusherCluster });
    pusher.subscribe(pusherChannel);
    pusher.bind(pusherEvent, (data) => {
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