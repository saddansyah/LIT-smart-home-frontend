<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32 max-h-fit">
    <h1 class="text-2xl font-bold md:mt-12 lg:mt-0 lg:text-4xl">This is {{ username }}</h1>
    
  </main>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  username: String
});

const selected = ref([])
const tab = ref(null);

const items = ref([
  { wow: 'Real-Time', icon: 'mdi-clock' },
  { wow: 'Audience', icon: 'mdi-account' },
  { wow: 'Conversions', icon: 'mdi-flag' },
]);

</script>
