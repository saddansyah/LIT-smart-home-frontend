<template>
  <!-- <div v-if="notify.success">
      <NotifySnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
  </div>
  <div v-else>
      <WarningSnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
  </div> -->
  <main class="container w-full p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
    <div class="mb-12">
      <h1 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600">Devices</h1>
    </div>
    <div v-if="isDeviceLoading">
      <MainDashboardLoading />
    </div>
    <div v-else>
      <div class="mb-9">
        <v-text-field name="Search" v-model="searchText" append-icon="mdi-magnify" clear-icon="mdi-close" label="Search"
          hide-details clearable></v-text-field>

        <div class="content-top flex flex-row justify-between">
          <div class="content-top-left">
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
                  <v-list-item v-for="(item, index) in dropdownItems.sort" @click="selectSort(item);" :key="index"
                    :title="item.title" v-model="selectedSort">
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-icon icon="mdi-menu-down"></v-icon>
            </button>
          </div>
          <div class="content-top-right">
            <v-dialog v-model="addDialog" persistent>
              <template v-slot:activator="{ props }">
                <button v-ripple v-bind="props"
                  class="inline-block mt-6 px-4 py-2 rounded-full font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg">
                  Add New Devices <v-icon icon="mdi-plus"></v-icon>
                </button>
              </template>
              <AddDevice @close="$event => addDialog = false" :addDialog="addDialog" @notify="emitNotify" />
            </v-dialog>
          </div>
        </div>
      </div>
      <div class="main-container">
        <h3 class="font-bold">You have {{ devices.length }} device(s)</h3>
        <div v-if="!devices.length">
          <div class="button inline-block mt-6 max-w-sm h-20 w-48 lg:h-24 lg:w-64 px-4 mr-5 rounded-xl bg-slate-200">
            <div class="w-full h-full flex items-center justify-center flex-col text-gray-400">
              <v-icon icon="mdi-emoticon-sad-outline"></v-icon>
              <h2 class="text-base mt-2">
                No such device(s)
              </h2>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="mt-6">
            <DevicesCard :device="device" v-for="device in filteredDevices" :key="device.id" @notify="emitNotify" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { RouterView, RouterLink } from 'vue-router';

import { DevicesCard, AddDevice, NotifySnackbar, MainDashboardLoading, LineLoading } from '@/utils/componentLoader';

const store = useStore();

const devices = computed(() => store?.state?.device?.devices);

const { isDeviceLoading } = defineProps(['isDeviceLoading']);
const emit = defineEmits(['notify'])

const isUsageLoading = ref(false)
const addDialog = ref(false);

const searchText = ref('')
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

// Snackbar
const emitNotify = (state, success, message) => {
    emit('notify', state, success, message)
}

// Category Dropdown
const dropdownItems = ref({
  deviceCategory: computed(() => [{ 'title': 'All Devices', 'value': 'AllDevices' }, ...[...new Set(devices.value.map(device => device.category))]
    .map(item => { return { 'title': item, 'value': item.split(' ').join('') } })]),
  sort: [
    { title: 'Name (A-Z)', value: 'nameAscending' },
    { title: 'Name (Z-A)', value: 'nameDescending' },
    { title: 'By Devices State', value: 'deviceStateAscending' },
    { title: 'By Favorite Device (Default)', value: 'favouriteDeviceAscending' },
  ],
}
);

const selectedDeviceCategory = ref("All Devices");
const selectedSort = ref("By Favorite Device (Default)");

const selectDeviceCategory = (item) => {
  selectedDeviceCategory.value = item.title;
}

const selectSort = (item) => {
  selectedSort.value = item.title;
}

</script>