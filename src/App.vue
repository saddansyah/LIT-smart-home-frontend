<script setup>

// Device Fetch
import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

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
