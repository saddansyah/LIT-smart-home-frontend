<template>
  <main class="container px-12 py-16 mx-auto mt-32 md:mt-40 lg:mt-32 bg-slate-50 rounded-xl shadow">
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
      "./src/components/About/About.md", {
      headers: {
        'Accept': 'application/text',
      }
    }
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
