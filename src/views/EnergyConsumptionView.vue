<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Energy Consumption</h1>
    </div>
    <div class="mb-9">
      <v-text-field name="Search" append-icon="mdi-magnify" clear-icon="mdi-close" label="Search" hide-details
        clearable></v-text-field>
      <button
        class="inline-block mt-6 mr-6 px-3 py-1 rounded-full text-base outline outline-2 outline-gray-300 bg-slate-50">All
        Devices <v-icon icon="mdi-menu-down"></v-icon></button>
      <button
        class="inline-block mt-6 mr-6 px-3 py-1 rounded-full text-base outline outline-2 outline-gray-300 bg-slate-50">Sort
        by names (A-Z) <v-icon icon="mdi-menu-down"></v-icon></button>
    </div>
    <div class="main-container flex lg:flex-row lg:gap-12 w-full h-full">
      <div class="card rounded w-64 h-fit shadow">
        <v-list density="compact" nav class="bg-slate-50">
          <v-list-item active-color="#1d4ed8" prepend-icon="mdi-view-dashboard" title="All" value="all"></v-list-item>
          <v-list-item active-color="#1d4ed8" prepend-icon="mdi-devices" title="By Devices"
            value="byDevices"></v-list-item>
          <v-list-item active-color="#1d4ed8" prepend-icon="mdi-calendar-range" title="By Date"
            value="byDate"></v-list-item>
        </v-list>
      </div>
      <PowerContainerAll />
    </div>
  </main>
</template>

<script setup>
import { EnergyContainerAll, PowerContainerAll } from "@/utils/componentLoader.js";

</script>