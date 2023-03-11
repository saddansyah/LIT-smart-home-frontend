<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Main Dashboard</h1>
    </div>
    <div class="mb-9">
      <h3 class="mb-3 lg:text-xl font-semibold">Your Favorite Devices</h3>
      <div class="overflow-x-auto overflow-y-hidden whitespace-nowrap pb-2">
        <FavoriteDevicesCard v-for="device in favoriteDevices" :key="device.id" :device="device" />
      </div>
    </div>
    <div class="lg:text-xl font-semibold">
      <h3 class="mb-3">Your Energy Consumption</h3>
      <div class="grid lg:grid-rows-3 lg:grid-cols-6 gap-6 h-fit">
        <!-- Card 1 -->
        <div v-ripple :ripple="{ class: 'text-red' }"
          class="flex flex-col gap-8 md:col-span-2 lg:row-span-2 lg:col-span-2 lg:row-start-1 p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200 transition-all">
          <div class="content-top flex flex-row justify-between">
            <div class="content-top-left items-center gap-2">
              <h3 class="font-bold text-xl lg:text-2xl inline-block">Total Energy Today</h3>
              <v-icon icon="mdi-menu-down" />
            </div>
            <div class="content-top-right">
              <a href="/"><v-icon icon="mdi-information-outline" class="text-gray-400" /></a>
            </div>
          </div>
          <div class="main-content flex flex-row gap-4 items-center">
            <div class="text-6xl lg:text-8xl">⚡</div>
            <div>
              <h3 class="text-6xl lg:text-8xl font-bold">12</h3>
              <h1 class="text-xl lg:text-2xl text-gray-600">kilowatt-hour (kWh)</h1>
            </div>
          </div>
          <div class="daily-goal">
            <h3 class="font-bold text-lg inline-block mb-3">Daily Goal:</h3>
            <div class="progress-bar">
              <v-progress-linear model-value="40" buffer-value="55" color="blue" height="12" class="mb-3"></v-progress-linear>
            </div>
            <div class="text-bottom flex justify-between">
              <p class="text-base">40% from <span class="font-bold">30 kWh</span></p>
              <p class="text-base underline text-gray-400">Set your goals here</p>
            </div>
          </div>
        </div>
        <!-- Card 2 -->
        <div v-ripple
          class="flex flex-col gap-6 md:col-span-1 lg:row-span-1 lg:col-span-2 lg:row-start-3 p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200 transition-all">
          <div class="content-top flex flex-row justify-between gap-8">
            <h3 class="font-bold text-xl inline-block">Daily Highest Devices Consumption</h3>
            <a href="/">
              <h3 class="text-base underline text-gray-400">View All</h3>
            </a>
          </div>
          <div class="main-content flex flex-row justify-between items-start">
            <div class="main-content-left flex flex-row items-center gap-2">
              <v-icon icon="mdi-ceiling-light" class="text-sky-800 text-3xl lg:text-4xl"></v-icon>
              <h4 class="lg:text-xl">Lampu1</h4>
            </div>
            <div class="main-content-right flex flex-row items-center">
              <v-icon icon="mdi-lightning-bolt" class="text-3xl lg:text-4xl"></v-icon>
              <h4 class="lg:text-xl">8 kWH</h4>
            </div>
          </div>
        </div>
        <!-- Card 3 -->
        <div v-ripple
          class="inline-block row-span-3 md:col-span-3 lg:row-span-3 lg:col-span-4 p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200 transition-all">
          <div class="content-top flex flex-row justify-between">
            <div class="content-top-left items-center gap-2">
              <h3 class="font-bold text-xl lg:text-2xl inline-block mb-3">Daily Energy Consumption</h3>
            </div>
          </div>
          <div class="main-content graph">
            <PeakPowerChart chartId="mainDashboardChart" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto'
import { FavoriteDevicesCard, PeakPowerChart } from "@/utils/componentLoader.js";

const favoriteDevices = ref([
  { id: 1, name: 'Lampu1', state: 'ON', icon: 'mdi-ceiling-light' },
  { id: 2, name: 'Lampu2', state: 'OFF', icon: 'mdi-ceiling-light' },
  { id: 3, name: 'Terminal', state: 'OFF', icon: 'mdi-power-socket-eu' }
]);


</script>
