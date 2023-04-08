<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Energy Consumption</h1>
    </div>
    <div class="mb-9">
      <v-text-field name="Search" v-model="searchText" append-icon="mdi-magnify" clear-icon="mdi-close" label="Search"
        hide-details clearable></v-text-field>
      <div class="filter-wrapper flex flex-row justify-between">
        <div class="content-left">
          <button v-ripple
            class="inline-block mt-6 mr-6 px-3 py-1 rounded-full text-base outline outline-2 outline-gray-300 bg-slate-50">
            {{ selectedDeviceCategory }}
            <v-menu activator="parent">
              <v-list>
                <v-list-item v-for="(item, index) in dropdownItems.deviceCategory" @click="selectDeviceCategory(item)"
                  :key="index" :title="item.title" v-model="selectedDeviceCategory">
                </v-list-item>
              </v-list>
            </v-menu>
            <v-icon icon="mdi-menu-down"></v-icon>
          </button>
          <button v-ripple
            class="inline-block mt-6 mr-6 px-3 py-1 rounded-full text-base outline outline-2 outline-gray-300 bg-slate-50">
            {{ selectedSort }}
            <v-menu activator="parent">
              <v-list>
                <v-list-item v-for="(item, index) in dropdownItems.sort" @click="selectSort(item)" :key="index"
                  :title="item.title" v-model="selectedSort">
                </v-list-item>
              </v-list>
            </v-menu>
            <v-icon icon="mdi-menu-down"></v-icon>
          </button>
          <button v-ripple
            class="inline-block mt-6 mr-6 px-3 py-1 rounded-full text-base outline outline-2 outline-gray-300 bg-slate-50">
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
        <button v-ripple
          class="inline-block mt-6 px-3 py-1 rounded-full text-base outline outline-2 outline-gray-300 bg-slate-50">
          {{ selectedType }}
          <v-menu activator="parent">
            <v-list>
              <v-list-item v-for="(item, index) in dropdownItems.type" @click="selectType(item)" :key="index"
                :title="item.title" v-model="selectedType">
              </v-list-item>
            </v-list>
          </v-menu>
          <v-icon icon="mdi-menu-down"></v-icon>
        </button>
      </div>
    </div>
    <div class="" v-if="false">
      <MainDashboardLoading />
    </div>
    <div class="" v-else>
      <div class="main-container flex lg:flex-row lg:gap-12 w-full h-full">
        <div class="card rounded-lg w-64 h-fit shadow bg-slate-50">
          <v-tabs v-model="tab" color="blue-darken-3" direction="vertical" density="comfortable" mandatory hide-slider
            grow>
            <v-tab value="all" prepend-icon="mdi-view-dashboard" selected-class="bg-sky-200">All</v-tab>
            <v-tab value="byDevices" prepend-icon="mdi-devices" selected-class="bg-sky-200">By Device</v-tab>
          </v-tabs>
        </div>
        <div class="devices w-full" v-if="selectedType === 'Power'">
          <v-window direction="horizontal" v-model="tab" class="p-1">
            <v-window-item value="all">
              <PowerContainerAll :isLoading="isUsageLoading" :selectedDate="selectedDate"
                @refreshChart="refreshFetch()" />
            </v-window-item>
            <v-window-item value="byDevices">
              <div v-if="isDeviceLoading">
                <MainDashboardLoading />
              </div>
              <div v-else-if="!filteredDevices.length">
                <div class="w-full h-[80vh] ">
                  <div
                    class="flex text-xl p-12 items-center justify-center flex-col text-gray-400 rounded-xl bg-slate-200">
                    <v-icon icon="mdi-emoticon-sad-outline"></v-icon>
                    <h2 class="mt-2">
                      No such device(s)
                    </h2>
                  </div>
                </div>
              </div>
              <div v-else>
                <PowerContainerDevice :isLoading="isUsageLoading" :selectedDate="selectedDate" :chartId="device.id"
                  :device="device" v-for="device in filteredDevices" :key="device.id" />
              </div>
            </v-window-item>
          </v-window>
        </div>
        <div class="devices w-full" v-else-if="selectedType === 'Energy'">
          <v-window direction="horizontal" v-model="tab" class="p-1">
            <v-window-item value="all">
              <EnergyContainerAll :isLoading="isUsageLoading" :selectedDate="selectedDate"
                @refreshChart="refreshFetch()" />
            </v-window-item>
            <v-window-item value="byDevices">
              <div v-if="isDeviceLoading">
                <MainDashboardLoading />
              </div>
              <div v-else-if="!filteredDevices.length">
                <div class="w-full h-[80vh] ">
                  <div
                    class="flex text-xl p-12 items-center justify-center flex-col text-gray-400 rounded-xl bg-slate-200">
                    <v-icon icon="mdi-emoticon-sad-outline"></v-icon>
                    <h2 class="mt-2">
                      No such device(s)
                    </h2>
                  </div>
                </div>
              </div>
              <div v-else>
                <EnergyContainerDevice :isLoading="isUsageLoading" :selectedDate="selectedDate" :chartId="device.id"
                  :device="device" v-for="device in filteredDevices" :key="device.id" />
              </div>
            </v-window-item>
          </v-window>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { EnergyContainerAll, PowerContainerAll, EnergyContainerDevice, PowerContainerDevice, MainDashboardLoading, GraphLoading, BasicLoading, LineLoading } from "@/utils/componentLoader.js";

const store = useStore();

const { isDeviceLoading } = defineProps(['isDeviceLoading']);
const emit = defineEmits(['notify']);
const isUsageLoading = ref(false)

// Pre-fetch total usage
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
fetchTotalUsage('hourly')

const devices = computed(() => store?.state?.device?.devices);
const searchText = ref('')
const tab = ref(null);
const dropdownItems = ref({
  deviceCategory: computed(() => [{ 'title': 'All Devices', 'value': 'AllDevices' }, ...[...new Set(devices.value.map(device => device.category))]
    .map(item => { return { 'title': item, 'value': item.split(' ').join('') } })]),
  sort: [
    { title: 'Name (A-Z)', value: 'nameAscending' },
    { title: 'Name (Z-A)', value: 'nameDescending' },
    { title: 'By Devices State', value: 'deviceStateAscending' },
    { title: 'By Favorite Device', value: 'favouriteDeviceAscending' },
  ],
  date: [
    { title: 'Today', value: 'hourly' },
    { title: 'Weekly', value: 'daily' },
    { title: 'Monthly', value: 'weekly' },
  ],
  type: [
    { title: 'Energy', value: 'energy' },
    { title: 'Power', value: 'power' },
  ]
}
);
const selectedDeviceCategory = ref("All Devices");
const selectedSort = ref("Name (A-Z)");
const selectedDate = ref("Today");
const selectedType = ref("Energy");

const selectDeviceCategory = (item) => {
  selectedDeviceCategory.value = item.title
}

const selectSort = (item) => {
  selectedSort.value = item.title
}

const selectDate = (item) => {
  selectedDate.value = item.title
}

const selectType = (item) => {
  selectedType.value = item.title
}

const filteredDevices = computed(() => {

  let filtered = store?.state?.device?.devices.filter(item => {
    return item.device_name.toLowerCase().includes(searchText.value.toLowerCase())
  });

  if (selectedDeviceCategory) {
    filtered = categoryFilterDevices(selectedDeviceCategory, filtered);
  }

  if (selectedSort) {
    filtered = sortDevices(selectedSort, filtered);
  };

  return filtered;

})

// Filter Device
const categoryFilterDevices = (key, data) => {
  return key.value === 'All Devices' ? data : data.filter(item => String(item.category) === String(key.value))
}

// Sorting
const sortDevices = (key, data) => {

  if (key.value === 'Name (A-Z)') {
    return data.sort((a, b) => a.device_name.toLowerCase().localeCompare(b.device_name.toLowerCase()));
  }
  else if (key.value === 'Name (Z-A)') {
    return data.sort((a, b) => b.device_name.toLowerCase().localeCompare(a.device_name.toLowerCase()));
  }
  else if (key.value === 'By Devices State') {
    return data.sort((a, b) => Number(b.state) - Number(a.state));
  }
  else if (key.value === 'By Favorite Device') {
    return data.sort((a, b) => Number(b.is_favorite() - Number(a.is_favorite)));
  }
  else {
    return data
  }
}

// Fetch Refresh
const refreshFetch = () => {
  if (selectedDate.value === 'Today') {
    fetchTotalUsage('hourly');
  }
  else if (selectedDate.value === 'Weekly') {
    fetchTotalUsage('daily');
  }
  else if (selectedDate.value === 'Monthly') {
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