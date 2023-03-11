<template>
  <div @click="toggleDeviceState" v-ripple
    :class="'button inline-block max-w-sm h-20 w-48 lg:h-24 lg:w-64 px-4 mr-5  rounded-xl shadow transition-all' + ' ' + (deviceState ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-slate-50 hover:bg-gray-200')">
    <div class="flex flex-row h-full w-full items-center justify-between">
      <div class="content-left flex flex-row items-center gap-4">
        <!-- <img src="#" alt="icon"> -->
        <v-icon :icon="device.icon" size="x-large" :class="(deviceState ? 'text-yellow-200' : ' text-sky-800')"></v-icon>
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
import { ref } from "vue";


const deviceState = ref(false);

const toggleDeviceState = () => {
  deviceState.value = !deviceState.value;
}

defineProps({
  device: Object
});

</script>
