<template>
  <div class="bg-white relative z-20 shadow">
    <div class="container mx-auto h-fit">
      <v-breadcrumbs :items="breadcrumbs" class="py-2">
        <template #divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const x = 2;

const breadcrumbs = ref([
  {
    title: "Home",
    disabled: false,
    href: "/",
  },
  {
    title: "Child Path",
    disabled: false,
    href: "/",
  },
]);
</script>
