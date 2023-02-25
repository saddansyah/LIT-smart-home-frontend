<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32 max-h-fit">
    <h1 class="text-2xl font-bold md:mt-12 lg:mt-0 lg:text-4xl">This is {{ username }}</h1>
  </main>
</template>

<script setup>
defineProps({
    username: String
});
</script>
