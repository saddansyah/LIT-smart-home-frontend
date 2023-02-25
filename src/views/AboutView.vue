<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="prose max-w-none">
      <div v-html="markdownToHtml"></div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { marked } from "marked";

const markdown = ref("");

onMounted(() => {
  const getData = async () => {
    const response = await fetch(
      "./README.md"
      );
      const data = await response.text();
      markdown.value = data;
    };
    getData();
  });
  
  const markdownToHtml = computed(() => {
    return marked(markdown.value);
  });

</script>

<style lang="scss"></style>
