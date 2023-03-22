<script setup>

// Device Fetch
import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

(async function fetchDataDevices() {
    try {
        await store.dispatch('_fetchDataDevices');
    }
    catch (error) {
        alert(error);
    }
})();

</script>

<template>
    <RouterView />
</template>

<style scoped></style>
