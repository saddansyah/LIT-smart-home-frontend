<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32 max-h-fit">
    <h1 class="text-2xl font-bold md:mt-12 lg:mt-0 lg:text-4xl">This is {{ username }}</h1>
    <br />
    <v-card class="mx-auto" max-width="300">
      <v-list density="compact" return-object v-model="selected">
        <v-list-subheader>REPORTS</v-list-subheader>

        <v-list-item v-model="selected" v-for="(item, i) in items" :key="i" :value="item" active-color="primary">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.wow }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
    <v-select label="Select" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" return-object ></v-select>
    {{ selected }}
  </main>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  username: String
});

const selected = ref([])

const items = ref([
  { wow: 'Real-Time', icon: 'mdi-clock' },
  { wow: 'Audience', icon: 'mdi-account' },
  { wow: 'Conversions', icon: 'mdi-flag' },
]);

</script>
