<template>
  <div>
    <h1 class="text-xl font-mono">This is {{ username }}</h1>
  </div>
</template>

<script setup>

defineProps({
    username: String
});

</script>
