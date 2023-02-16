<template>
  <main class="container p-4 flex flex-wrap items-center justify-between mx-auto">
    <h1 class="text-2xl font-bold lg:text-4xl">This is {{ username }}</h1>
  </main>
</template>

<script setup>

defineProps({
    username: String
});

</script>
