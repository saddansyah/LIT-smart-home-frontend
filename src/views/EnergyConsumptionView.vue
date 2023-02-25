<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Energy Consumption</h1>
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
      <button class="inline-block mt-6 mr-6 px-3 rounded-full text-base outline outline-2 outline-offset-2 outline-gray-300">All Devices <v-icon icon="mdi-menu-down"></v-icon></button>
      <button class="inline-block mt-6 mr-6 px-3 rounded-full text-base outline outline-2 outline-offset-2 outline-gray-300">Sort by names (A-Z) <v-icon icon="mdi-menu-down"></v-icon></button>
    </div>
  </main>
</template>