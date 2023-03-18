<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Energy Consumption</h1>
    </div>
    <div class="mb-9">
      <v-text-field name="Search" append-icon="mdi-magnify" clear-icon="mdi-close" label="Search" hide-details
        clearable></v-text-field>
      <div class="filter-wrapper flex flex-row justify-between">
        <div class="content-left">
          <button v-ripple
            class="inline-block mt-6 mr-6 px-3 py-1 rounded-full text-base outline outline-2 outline-gray-300 bg-slate-50">
            {{ selectedDeviceCategory }}
            <v-menu activator="parent">
              <v-list>
                <v-list-item v-for="(item, index) in dropdownItems.deviceCategory" @click="selectDeviceCategory(item)"
                  :key="index" :title="item.title" v-model="selectedItems">
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
                  :title="item.title" v-model="selectedItems">
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
                  :title="item.title" v-model="selectedItems">
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
                :title="item.title" v-model="selectedItems">
              </v-list-item>
            </v-list>
          </v-menu>
          <v-icon icon="mdi-menu-down"></v-icon>
        </button>
      </div>
    </div>
    <div class="main-container flex lg:flex-row lg:gap-12 w-full h-full">
      <div class="card rounded-lg w-64 h-fit shadow bg-slate-50">
        <v-tabs v-model="tab" color="blue-darken-3" direction="vertical" density="comfortable" mandatory hide-slider grow>
          <v-tab value="all" prepend-icon="mdi-view-dashboard" selected-class="bg-sky-200">All</v-tab>
          <v-tab value="byDevices" prepend-icon="mdi-devices" selected-class="bg-sky-200">By Device</v-tab>
        </v-tabs>
      </div>
      <div class="devices w-full" v-if="true">
        <v-window v-model="tab" class="p-1">
          <v-window-item value="all">
            <PowerContainerAll />
          </v-window-item>
          <v-window-item value="byDevices">
            <PowerContainerDevice :chartId="device.id" :device="device" v-for="device in devices" :key="device.id" />
          </v-window-item>
        </v-window>
      </div>
    </div>
  </main>
</template>

<script setup>
import { EnergyContainerAll, PowerContainerAll, EnergyContainerDevice, PowerContainerDevice } from "@/utils/componentLoader.js";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const devices = computed(() => store?.state?.device?.devices);


const tab = ref(null);
const dropdownItems = ref({
  deviceCategory: [
    { title: 'All Devices', value: 'allDevices' },
    { title: 'lamp', value: 'lamp' },
    { title: 'terminal', value: 'terminal' },
    { title: 'smart charger', value: 'smartCharger' },
  ],
  sort: [
    { title: 'Name (A-Z)', value: 'nameAscending' },
    { title: 'Name (Z-A)', value: 'nameDescending' },
  ],
  date: [
    { title: 'Today', value: 'today' },
    { title: 'Weekly', value: 'weekly' },
    { title: 'Monthly', value: 'monthly' },
    { title: 'Select Date Range', value: 'selectDateRange' },
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
const selectedType = ref("Power");

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

</script>