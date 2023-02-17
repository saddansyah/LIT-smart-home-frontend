<template>
  <main class="container p-4 mx-auto mt-32">
    <h1 class="text-2xl font-bold lg:text-4xl">This is {{ username }}</h1>
  </main>
</template>

<script setup>
defineProps({
    username: String
});
</script>
