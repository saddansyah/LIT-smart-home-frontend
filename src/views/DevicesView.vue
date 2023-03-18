<template>
  <main class="container w-full p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Devices</h1>
    </div>
    <div class="mb-9">
      <v-text-field name="Search" append-icon="mdi-magnify" clear-icon="mdi-close" label="Search" hide-details
        clearable></v-text-field>
      <div class="content-top flex flex-row justify-between">
        <div class="content-top-left">
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
        </div>
        <div class="content-top-right">
          <button v-ripple
            class="inline-block mt-6 px-4 py-2 rounded-full font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg">Add
            New
            Devices <v-icon icon="mdi-plus"></v-icon></button>
        </div>
      </div>
    </div>
    <div class="main-container">
      <h3 class="font-bold">You have {{ devices.length }} device(s)</h3>
      <div class="mt-6">
        <div v-if="devices">
          <DevicesCard :device="device" v-for="device in devices" :key="device.id" />
        </div>
        <div v-else>
          <h1>Loading...</h1>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import DevicesCard from '@/components/DevicesCard.vue'

const store = useStore();

const devices = computed(() => store?.state?.device?.devices);


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
    { title: 'By Devices State', value: 'deviceStateAscending' },
    { title: 'By Favorite Device', value: 'favouriteDeviceAscending' },
  ],
}
);

const selectedDeviceCategory = ref("All Devices");
const selectedSort = ref("Name (A-Z)");

const selectDeviceCategory = (item) => {
  selectedDeviceCategory.value = item.title
}

const selectSort = (item) => {
  selectedSort.value = item.title
}


</script>