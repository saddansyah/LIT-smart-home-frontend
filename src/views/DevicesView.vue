<template>
  <main class="container w-full h-[100vh] max-h-fit p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Devices</h1>
    </div>
    <div class="mb-9">
      <v-text-field
        name="Search"
        append-icon="mdi-magnify"
        clear-icon="mdi-close"
        label="Search"
        hide-details
        clearable
      ></v-text-field>
      <div class="content-top flex flex-row justify-between">
        <div class="content-top-left">
          <button class="inline-block mt-6 mr-6 px-3 rounded-full text-base outline outline-2 outline-offset-2 outline-gray-300">All Devices <v-icon icon="mdi-menu-down"></v-icon></button>
      <button class="inline-block mt-6 mr-6 px-3 rounded-full text-base outline outline-2 outline-offset-2 outline-gray-300">Sort by names (A-Z) <v-icon icon="mdi-menu-down"></v-icon></button>
        </div>
        <div class="content-top-right">
          <button class="inline-block mt-6 px-4 py-2 rounded-full font-semibold text-white bg-sky-600 shadow-lg">Add New Devices <v-icon icon="mdi-plus"></v-icon></button>
        </div>
      </div>
    </div>
    <div class="main-container">
      <h3 class="font-bold">You have 1 device(s)</h3>
      <div class="mt-6">
        <DevicesCard/>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue';
  
  import DevicesCard from '@/components/DevicesCard.vue'

  const items = ref([1,2,3,4,5,4])
</script>