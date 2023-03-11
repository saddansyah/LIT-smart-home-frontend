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
    <v-select label="Select" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      return-object></v-select>
    {{ selected }}
    <v-tabs v-model="tab" class="bg-slate-500" direction="vertical"> 
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          One
        </v-window-item>

        <v-window-item value="two">
          Two
        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>

    <v-slide-group show-arrows>
      <v-slide-group-item v-for="n in 25" :key="n" v-slot="{ isSelected, toggle }">
        <v-btn class="ma-2" rounded :color="isSelected ? 'primary' : undefined" @click="toggle">
          Options {{ n }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
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
