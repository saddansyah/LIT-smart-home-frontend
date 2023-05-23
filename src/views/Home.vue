<template>
    <Navbar :username="username"/>

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
import { useStore } from "vuex";
import { Navbar, Footer, NotifySnackbar, WarningSnackbar } from "@/utils/componentLoader";

const username = JSON.parse(localStorage.getItem('user')).name;

const store = useStore();


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