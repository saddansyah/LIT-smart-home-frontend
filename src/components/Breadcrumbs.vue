<template>
  <div class="bg-slate-100 relative z-20 shadow">
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
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const routePath = computed({
  get: () => route.fullPath
});

const breadcrumbs = ref(["Home", ""]);

watchEffect(() => {
  const newPath = routePath.value.split('/');
  newPath.shift()
  breadcrumbs.value = ["Home", ...newPath]
});

</script>
