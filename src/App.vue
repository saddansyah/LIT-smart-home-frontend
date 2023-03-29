<script setup>
import { useStore } from "vuex";
import { initFetchIntercept } from "@/fetchInterceptor.js";
import { ref } from "vue";

const store = useStore();

const unregister = initFetchIntercept();

// Pre-fetch to put on the vuex store
(async function fetchDataDevices() {
    try {
        await store.dispatch('_fetchDataDevices');
    }
    catch (error) {
        alert(error);
        console.error(error);
    }
})();

</script>

<template>
    <RouterView />
</template>

<style scoped></style>
