<template>
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <v-breadcrumbs :items="breadcrumbs">
      <template #divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const x= 2;

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
  }
]);


</script>
