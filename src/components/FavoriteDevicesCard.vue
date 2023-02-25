<template>
  <div
    class="inline-block max-w-sm h-20 w-48 lg:h-24 lg:w-64 px-4 mr-5 bg-gray-100 rounded-xl shadow hover:bg-gray-200"
  >
    <div class="flex flex-row h-full w-full items-center justify-between">
      <div class="content-left flex flex-row items-center gap-4">
        <!-- <img src="#" alt="icon"> -->
        <button><v-icon :icon="device.icon" size="x-large" class="text-sky-800"></v-icon></button>
        <div class="text-content flex flex-col justify-center">
          <h2 class="font-semibold lg:text-xl">{{ device.name }}</h2>
          <h4 class="font-light text-sm lg:text-base">{{ device.state }}</h4>
        </div>
      </div>
      <a href="/"><v-icon icon="mdi-information-outline" class="text-gray-400"></v-icon></a>
    </div>
  </div>
</template>

<script setup>

defineProps({
    device: Object
})

</script>
