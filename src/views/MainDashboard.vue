<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Main Dashboard</h1>
    </div>
    <div v-if="!devices[0]">
      <!-- <h1 class="text-2xl font-mono mt-6">Loading Favorite Devices...</h1> -->
      <FavoriteDeviceLoading />
    </div>
    <div v-else>
      <div class="mb-9">
        <h3 class="mb-3 lg:text-xl font-semibold">Your Favorite Devices</h3>
        <div class="overflow-x-auto overflow-y-hidden whitespace-nowrap pb-2">
          <FavoriteDevicesCard v-for="device in devices.filter(item => item.is_favorite === 1)" :key="device.id"
            :device="device" />
        </div>
      </div>
    </div>
    <div v-if="!totalUsages[0]">
      <MainDashboardLoading />
    </div>
    <div v-else>
      <div class="mt-6">
        <div class="lg:text-xl font-semibold">
          <h3 class="mb-3">Your Energy Consumption</h3>
          <div class="grid lg:grid-rows-3 lg:grid-cols-6 gap-6 h-fit">
            <!-- Card 1 -->
            <div v-ripple :ripple="{ class: 'text-red' }"
              class="flex flex-col gap-8 md:col-span-2 lg:row-span-2 lg:col-span-2 lg:row-start-1 p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200 group transition-all">
              <div class="content-top flex flex-row justify-between">
                <div class="content-top-left items-center gap-2">
                  <button v-ripple class="inline-block px-3 py-1 rounded font-bold text-xl lg:text-2xl">
                    {{ selectedDeviceCategory }}
                    <v-menu activator="parent">
                      <v-list>
                        <v-list-item v-for="(item, index) in dropdownItems.deviceCategory"
                          @click="selectDeviceCategory(item)" :key="index" :title="item.title" v-model="selectedItems">
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-icon icon="mdi-menu-down"></v-icon>
                  </button>
                </div>
                <div class="content-top-right">
                  <a href="/"><v-icon icon="mdi-information-outline" class="text-gray-400" /></a>
                </div>
              </div>
              <div class="main-content flex flex-row gap-4 items-center">
                <div class="text-6xl lg:text-8xl">⚡</div>
                <div>
                  <h3 class="text-4xl lg:text-6xl font-bold">{{ totalUsagesToday[totalUsagesToday.length - 1].kwh }}</h3>
                  <h1 class="text-xl lg:text-2xl text-gray-600">kilowatt-hour (kWh)</h1>
                </div>
              </div>
              <div class="daily-goal">
                <h3 class="font-bold text-lg inline-block mb-3">Daily Goal:</h3>
                <div class="progress-bar">
                  <v-progress-linear model-value="40" buffer-value="55" color="blue" height="12"
                    class="mb-3"></v-progress-linear>
                </div>
                <div class="text-bottom flex justify-between">
                  <p class="text-base">{{ goalPercentage }}% from <span class="font-bold">{{ energyGoal }} kWh</span></p>
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
                  <h4 class="lg:text-xl">{{ highestDeviceUsage.device_name }}</h4>
                </div>
                <div class="main-content-right flex flex-row items-center">
                  <v-icon icon="mdi-lightning-bolt" class="text-3xl lg:text-4xl"></v-icon>
                  <h4 class="lg:text-xl">{{ highestDeviceUsage.last_kwh }} kWH</h4>
                </div>
              </div>
            </div>
            <!-- Card 3 -->
            <div v-ripple
              class="inline-block row-span-3 md:col-span-3 lg:row-span-3 lg:col-span-4 p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200 transition-all">
              <div class="content-top mb-3 flex justify-between items-start">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Daily Energy Consumption</h3>
                <button v-ripple
                  class="inline-block text-base px-4 py-2 rounded-lg font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg">
                  Refresh <v-icon icon="mdi-refresh"></v-icon>
                </button>
              </div>
              <div class="main-content graph">
                <div v-if="selectedDeviceCategory === 'Total Energy Today'">
                  <EnergyUsageChart chartId="mainDashboardChart" :data="totalUsages" :past="yesterday" :current="today"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 

<script setup>
import { ref, computed } from 'vue';
import Chart from 'chart.js/auto'
import { FavoriteDevicesCard, EnergyUsageChart, FavoriteDeviceLoading, MainDashboardLoading } from "@/utils/componentLoader.js";
import { useStore } from 'vuex';
import { today, yesterday } from '@/utils/getTime';

const store = useStore();

// Pre-fetch total usage
(async function fetchTotalUsage() {
  try {
    await store.dispatch('_fetchDataTotalUsages', 'hourly');
  }
  catch (error) {
    alert(error);
    console.error(error);
  }
})();

const devices = computed(() => store?.state?.device?.devices);
const totalUsages = computed(() => store?.state?.deviceUsage?.totalUsages);
const totalUsagesToday = computed(() => store?.state?.deviceUsage?.totalUsages.filter(item => String(item.date) === String(today)));
const highestDeviceUsage = computed(() => devices?.value?.find(item => Number(item.last_kwh) === Math.max.apply(Math, devices?.value?.map(function (item) { return item.last_kwh; }))))
const energyGoal = ref(5);
const goalPercentage = computed(() => (Number(totalUsagesToday.value[totalUsagesToday.value.length - 1].kwh) / Number(energyGoal.value)) * 100);

const dropdownItems = ref({
  deviceCategory: [
    { title: 'Total Energy Today', value: 'hourly' },
    { title: 'Total Energy Weekly', value: 'daily' },
    { title: 'Total Energy Monthly', value: 'weekly' },
  ]
}
);

const selectedDeviceCategory = ref("Total Energy Today");

const selectDeviceCategory = (item) => {
  selectedDeviceCategory.value = item.title
}


</script>
