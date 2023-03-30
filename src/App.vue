<script setup>
import { initFetchIntercept } from "@/fetchInterceptor.js";
const unregister = initFetchIntercept();
</script>

<template>
    <RouterView />
</template>

<style scoped></style>
