<template>
  <main class="container text-base p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Main Dashboard</h1>
    </div>
    <div v-if="isDeviceLoading">
      <FavoriteDeviceLoading />
    </div>
    <div v-else>
      <div class="mb-9">
        <h3 class="mb-3 lg:text-xl font-semibold">Your Favorite Devices</h3>
        <div class="overflow-x-auto overflow-y-hidden whitespace-nowrap pb-2">
          <div v-if="devices.find(item => item.is_favorite)">
            <FavoriteDevicesCard v-for="device in devices.filter(item => item.is_favorite === 1)" :key="device.id"
              :device="device" @notify="emitNotify" />
          </div>
          <div v-else>
            <div class="button inline-block mt-6 max-w-sm h-20 w-48 lg:h-24 lg:w-64 px-4 mr-5 rounded-xl bg-slate-200">
              <div class="w-full h-full flex items-center justify-center flex-col text-gray-400">
                <v-icon icon="mdi-emoticon-sad-outline"></v-icon>
                <h2 class="text-base mt-2">
                  No such favorite device(s)
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                  {{ selectedDate }}
                  <v-menu activator="parent">
                    <v-list>
                      <v-list-item v-for="(item, index) in dropdownItems.date" @click="selectDate(item)" :key="index"
                        :title="item.title" v-model="selectedDate">
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-icon icon="mdi-menu-down"></v-icon>
                </button>
              </div>
              <div class="content-top-right">
                <v-tooltip location="top" text="All devices energy usage in kWH by specific time range">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" icon="mdi-information-outline" class="text-gray-400" />
                  </template>
                </v-tooltip>
              </div>
            </div>
            <div class="main-content flex flex-row gap-4 items-center">
              <div class="text-6xl lg:text-8xl">⚡</div>
              <div>
                <div v-if="isUsageLoading">
                  <BasicLoading />
                </div>
                <div v-else-if="selectedDate === 'Total Energy Today' && !isUsageLoading">
                  <h3 class="text-4xl lg:text-6xl font-bold">
                    {{ totalUsagesToday?.kwh || 0 }}
                  </h3>
                </div>
                <div v-else-if="selectedDate === 'Total Energy Weekly' && !isUsageLoading">
                  <h3 class="text-4xl lg:text-6xl font-bold">
                    {{ totalUsagesCurrentWeek?.kwh || 0 }}
                  </h3>
                </div>
                <div v-else-if="selectedDate === 'Total Energy Monthly' && !isUsageLoading">
                  <h3 class="text-4xl lg:text-6xl font-bold">
                    {{ totalUsagesCurrentMonth?.kwh || 0 }}
                  </h3>
                </div>
                <h1 class="text-xl lg:text-2xl text-gray-600">kilowatt-hour (kWh)</h1>
              </div>
            </div>
            <div class="daily-goal">
              <h3 class="font-bold text-lg inline-block mb-3">Daily Goal:</h3>
              <div class="progress-bar">
                <v-progress-linear model-value="40" buffer-value="55" color="blue" height="12"
                  class="mb-3"></v-progress-linear>
              </div>
              <div class="text-bottom flex justify-between w-full">
                <div v-if="isUsageLoading">
                  <LineLoading />
                </div>
                <div v-else-if="selectedDate === 'Total Energy Today' && !isUsageLoading">
                  <p class="text-base">{{ goalPercentageToday }}% from <span class="font-bold">{{ energyGoalToday }}
                      kWh</span></p>
                </div>
                <div v-else-if="selectedDate === 'Total Energy Weekly' && !isUsageLoading">
                  <p class="text-base">{{ goalPercentageWeekly }}% from <span class="font-bold">{{ energyGoalWeekly }}
                      kWh</span></p>
                </div>
                <div v-else-if="selectedDate === 'Total Energy Monthly' && !isUsageLoading">
                  <p class="text-base">{{ goalPercentageMonthly }}% from <span class="font-bold">{{ energyGoalMonthly }}
                      kWh</span></p>
                </div>
                <p class="text-base underline text-gray-400">Set your goals here</p>
              </div>
            </div>
          </div>
          <!--  -->
          <!-- Card 2 -->
          <div v-ripple
            class="flex flex-col gap-6 md:col-span-1 lg:row-span-1 lg:col-span-2 lg:row-start-3 p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200 transition-all">
            <div class="content-top flex flex-row justify-between gap-8">
              <h3 class="font-bold text-xl inline-block basis-3/5">Highest Devices Consumption</h3>
              <RouterLink :to="{ name: 'Devices' }">
                <h3 class="underline text-gray-400 text-sm md:text-base basis-2/5">View All</h3>
              </RouterLink>
            </div>
            <div v-if="isUsageLoading">
              <LineLoading />
            </div>
            <div v-else>
              <div class="main-content flex flex-row justify-between items-start">
                <div class="main-content-left flex flex-row items-center gap-2">
                  <v-icon icon="mdi-ceiling-light" class="text-sky-800 text-3xl lg:text-4xl"></v-icon>
                  <h4 class="lg:text-xl">{{ highestDeviceUsage.device_name || '-' }}</h4>
                </div>
                <div class="main-content-right flex flex-row items-center">
                  <v-icon icon="mdi-lightning-bolt" class="text-3xl lg:text-4xl"></v-icon>
                  <h4 class="lg:text-xl">{{ highestDeviceUsage.last_kwh || 0 }} kWH</h4>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <!-- Card 3 -->
          <div v-ripple
            class="inline-block row-span-3 md:col-span-3 lg:row-span-3 lg:col-span-4 p-6 bg-slate-50 rounded-xl shadow hover:bg-slate-200 transition-all">
            <div class="content-top mb-3 flex justify-between items-start">
              <h3 class="font-bold text-xl lg:text-2xl inline-block basis-3/5">Daily Energy Consumption</h3>
              <div class="basis-2/5 text-end">
                <button v-ripple @click="refreshFetch()"
                  class="inline-block text-base px-4 py-2 rounded-lg font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg">
                  <div v-if="isUsageLoading">
                    <ButtonLoading />
                  </div>
                  <div v-else>
                    <span class="hidden md:block">Refresh</span> <v-icon icon="mdi-refresh"></v-icon>
                  </div>
                </button>
              </div>
            </div>
            <div class="main-content graph">
              <div v-if="isUsageLoading">
                <GraphLoading />
              </div>
              <div v-else-if="selectedDate === 'Total Energy Today' && !isUsageLoading">
                <EnergyUsageChart chartId="todayEnergyChart"
                  :past="totalUsages?.filter(item => String(item.date) === String(yesterday))?.map(item => chartObjectBuilder(item.hour, item.kwh))"
                  :current="totalUsages?.filter(item => String(item.date) === String(today))?.map(item => chartObjectBuilder(item.hour, item.kwh))"
                  :labels="totalUsages?.map(item => item.hour)" />
              </div>
              <div v-else-if="selectedDate === 'Total Energy Weekly' && !isUsageLoading">
                <EnergyUsageChart chartId="weeklyEnergyChart"
                  :past="totalUsages?.filter(item => String(item.week) === String(pastWeek))?.map(item => chartObjectBuilder(item.date, item.kwh))"
                  :current="totalUsages?.filter(item => String(item.week) === String(currentWeek))?.map(item => chartObjectBuilder(item.date, item.kwh))"
                  :labels="totalUsages?.map(item => item.date)" />
              </div>
              <div v-else-if="selectedDate === 'Total Energy Monthly' && !isUsageLoading">
                <EnergyUsageChart chartId="monthlyEnergyChart"
                  :past="totalUsages?.filter(item => String(item.month) === String(pastMonth))?.map(item => chartObjectBuilder(item.week, item.kwh))"
                  :current="totalUsages?.filter(item => String(item.month) === String(currentMonth))?.map(item => chartObjectBuilder(item.week, item.kwh))"
                  :labels="totalUsages?.map(item => item.week)" />
              </div>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>
  </main>
</template> 

<script setup>
import { ref, computed, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import Chart from 'chart.js/auto'

import { FavoriteDevicesCard, EnergyUsageChart, FavoriteDeviceLoading, MainDashboardLoading, GraphLoading, BasicLoading, LineLoading, ButtonLoading } from "@/utils/componentLoader.js";
import { today, yesterday, currentWeek, pastWeek, currentMonth, pastMonth } from '@/utils/getTime';
import { chartObjectBuilder } from '@/utils/chartObjectBuilder';

const store = useStore();
const { isDeviceLoading } = defineProps(['isDeviceLoading']);
const emit = defineEmits(['notify'])
const isUsageLoading = ref(false)

// Pre-fetch total usage ----
async function fetchTotalUsage(timeRange) {
  try {
    isUsageLoading.value = true
    await store.dispatch('_fetchDataTotalUsages', timeRange);
    isUsageLoading.value = false
  }
  catch (error) {
    emitNotify(true, false, error)
    console.error(error);
  }
};
fetchTotalUsage('hourly');

// Devices -----
const devices = computed(() => store?.state?.device?.devices || []);

// Total Usages -----
const totalUsages = computed(() => store?.state?.deviceUsage?.totalUsages || []);
const totalUsagesToday = computed(() => store?.state?.deviceUsage?.totalUsages
  ?.filter(item => String(item.date) === String(today))
  ?.find((item, index, array) => { return index === (array.length - 1) }) || 0);
const totalUsagesCurrentWeek = computed(() => store?.state?.deviceUsage?.totalUsages
  ?.filter(item => String(item.week) === String(currentWeek))
  ?.find((item, index, array) => { return index === (array.length - 1) }) || 0);
const totalUsagesCurrentMonth = computed(() => store?.state?.deviceUsage?.totalUsages
  ?.filter(item => String(item.month) === String(currentMonth))
  ?.find((item, index, array) => { return index === (array.length - 1) }) || 0);


// Energy Goal -----
const energyGoal = 5
const energyGoalToday = ref(energyGoal);
const energyGoalWeekly = ref(energyGoal * 7);
const energyGoalMonthly = ref(energyGoal * 30);

const goalPercentageToday = computed(() => Math.round((Number(totalUsagesToday.value?.kwh) / Number(energyGoalToday.value)) * 100) || 0);
const goalPercentageWeekly = computed(() => Math.round((Number(totalUsagesCurrentWeek.value?.kwh) / Number(energyGoalWeekly.value)) * 100) || 0);
const goalPercentageMonthly = computed(() => Math.round((Number(totalUsagesCurrentMonth.value?.kwh) / Number(energyGoalMonthly.value)) * 100) || 0);

// Highest Device Usage -----
const highestDeviceUsage = computed(() => devices?.value?.find(item => Number(item.last_kwh) === Math.max.apply(Math, devices?.value?.map(function (item) { return item.last_kwh; }))) || [])

// Dropdown -----
const dropdownItems = ref({
  date: [
    { title: 'Total Energy Today', value: 'hourly' },
    { title: 'Total Energy Weekly', value: 'daily' },
    { title: 'Total Energy Monthly', value: 'weekly' },
  ]
}
);

const selectedDate = ref("Total Energy Today");

const selectDate = (item) => {
  selectedDate.value = item.title
}

// Refresh fetch from given time range -----
const refreshFetch = () => {
  if (selectedDate.value === 'Total Energy Today') {
    fetchTotalUsage('hourly');
  }
  else if (selectedDate.value === 'Total Energy Weekly') {
    fetchTotalUsage('daily');
  }
  else if (selectedDate.value === 'Total Energy Monthly') {
    fetchTotalUsage('weekly');
  }
  else {
    fetchTotalUsage('hourly');
  }
}
watch(selectedDate, refreshFetch)

// Snackbar
const emitNotify = (state, success, message) => {
  emit('notify', state, success, message)
}

</script>
