<template>
    <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
        {{ !device }}
        <div v-if="!device">
            <h1 class="text-2xl font-mono">Loading...</h1>
        </div>
        <div v-else>
            <div class="content-top mb-9 flex flex-row justify-between">
                <div class="content-top-left">
                    <div class="device-name flex flex-row gap-2 items-start">
                        <h2 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600 mb-3">{{ device.device_name
                        }}
                        </h2>
                        <button @click.prevent="$event => updateDeviceFavorite()" class="mr-2 text-yellow-500 text-xl">
                            <div v-if="device.is_favorite">
                                <v-icon v-ripple icon="mdi-star" size="large"></v-icon>
                            </div>
                            <div v-else>
                                <v-icon v-ripple icon="mdi-star-outline" size="large"></v-icon>
                            </div>
                        </button>
                    </div>
                    <v-chip size="large" color="green" class="font-semibold">{{ device.category }}</v-chip>
                    <div class="device-state inline-block">
                        <div v-if="device.state">
                            <v-chip size="large" prepend-icon="mdi-power" color="blue"
                                class="ml-3 font-semibold">ON</v-chip>
                        </div>
                        <div v-else>
                            <v-chip size="large" prepend-icon="mdi-power" color="grey"
                                class="ml-3 font-semibold">OFF</v-chip>
                        </div>
                    </div>
                </div>
                <button v-ripple @click="$event => updateDeviceState()"
                    :class="'self-start h-fit px-6 py-2 rounded-full font-semibold text-white shadow-lg transition-all duration-500 ' + (!device.state ? 'bg-sky-600' : 'bg-red-400 animate-pulse')">{{
                        !device.state
                        ? 'Turn On ' : 'Save your energy ' }}<v-icon icon="mdi-power"></v-icon></button>
            </div>
            <div class="main-content flex flex-row w-full gap-20">
                <div class="side-content flex flex-col">
                    <div class="p-4 self-center">
                        <v-icon :icon="device?.icon_url" class="text-9xl scale-125 text-sky-800"></v-icon>
                    </div>
                    <div class="specification">
                        <h3 class="text-xl font-bold">Specification</h3>
                        <p>Name: {{ device.device_name }}</p>
                        <p>Type: Panasonic 12W</p>
                        <p>Watt: {{ device.watt }} W</p>
                        <p>Voltage: {{ device.volt }} V</p>
                        <p>Ampere: {{ device.ampere }} A</p>
                    </div>
                    <button v-ripple
                        class="self-start h-fit w-full mt-3 px-4 py-2 rounded-lg font-semibold text-white bg-slate-400 shadow-lg">Change
                        Icon
                        <v-icon icon="mdi-devices"></v-icon></button>
                    <v-dialog v-model="editDialog" persistent>
                        <template v-slot:activator="{ props }">
                            <button v-ripple v-bind="props"
                                class="self-start h-fit w-full mt-3 px-4 py-2 rounded-lg font-semibold text-white bg-sky-600 shadow-lg">Edit
                                <v-icon icon="mdi-pencil"></v-icon></button>
                        </template>
                        <EditDevice @close="$event => editDialog = false" :deviceCategoryList="deviceCategoryList"
                            :device="device" />
                    </v-dialog>
                    <v-dialog v-model="deleteDialog" persistent @keydown.esc="deleteDialog = false">
                        <template v-slot:activator="{ props }">
                            <button v-ripple v-bind="props"
                                class="self-start h-fit w-full mt-3 px-4 py-2 rounded-lg font-semibold text-white bg-red-400 shadow-lg">Delete
                                <v-icon icon="mdi-delete"></v-icon></button>
                        </template>
                        <ModalDelete @close="$event => deleteDialog = false" @delete="$event => handleDeleteDevice()" />
                    </v-dialog>

                </div>
                <div class="main-container w-full h-fit rounded-xl">
                    <div class="grid lg:grid-rows-2 lg:grid-cols-6 gap-6 h-fit">
                        <div v-ripple
                            class="flex flex-col gap-8 md:col-span-2 h-fit lg:row-span-2 lg:col-span-2 lg:row-start-1 p-6 bg-neutral-50 rounded-xl shadow hover:bg-gray-200 transition-all">
                            <div class="content-top flex flex-row items-center gap-2">
                                <h3 class="font-bold text-xl lg:text-2xl inline-block">Daily Usage</h3>
                                <v-icon icon="mdi-menu-down" />
                            </div>
                            <div class="main-content flex flex-row gap-4 items-center">
                                <div class="text-6xl lg:text-8xl">⚡</div>
                                <div>
                                    <h3 class="text-2xl lg:text-4xl font-bold">{{ device.last_kwh }}</h3>
                                    <h1 class="text-xl lg:text-2xl text-gray-400">kilowatt-hour (kWh)</h1>
                                </div>
                            </div>
                            <div class="daily-goal">
                                <h3 class="font-bold text-xl inline-block">Average Daily Usage:</h3>
                                <h4 class="text-lg"><span class="font-bold text-2xl">{{ device.last_kwh }}</span> kWH</h4>
                            </div>
                        </div>
                        <!-- Card 2 -->
                        <div v-ripple
                            class="flex flex-col gap-6 md:col-span-1 lg:col-span-2 lg:row-start-3 p-6 bg-neutral-50 rounded-xl shadow hover:bg-gray-200 transition-all">
                            <div class="content-top flex flex-row justify-between gap-8">
                                <h3 class="font-bold text-xl inline-block">Device Peak Power</h3>
                                <v-tooltip location="top" text="Device's peak power (watt) within a certain time limit (daily, weekly, etc)">
                                    <template v-slot:activator="{ props }">
                                        <v-icon v-bind="props" icon="mdi-information-outline" class="text-gray-400" />
                                    </template>
                                </v-tooltip>
                            </div>
                            <div class="main-content flex flex-row justify-between items-center">
                                <div class="main-content-left flex flex-col">
                                    <h3 class="text-2xl lg:text-6xl font-bold">{{ device.watt }}</h3>
                                    <h1 class="text-xl self-start text-gray-400">Watt</h1>
                                </div>
                                <div class="main-content-right text-xl flex flex-col items-center text-gray-400">
                                    <div class="voltage flex gap-2">
                                        <v-icon icon="mdi-flash-triangle"></v-icon>
                                        <h4>12.1 V</h4>
                                    </div>
                                    <div class="ampere flex gap-2">
                                        <v-icon icon="mdi-current-dc"></v-icon>
                                        <h4>2.1 A</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Card 3 -->
                        <div v-ripple
                            class="inline-block row-span-3 md:col-span-3 lg:row-span-3 lg:col-span-4 p-6 bg-neutral-50 rounded-xl shadow hover:bg-gray-200 transition-all">
                            <div class="content-top flex flex-row justify-between">
                                <div class="content-top-left items-center gap-2">
                                    <button v-ripple class="inline-block px-3 py-1 rounded font-bold text-xl lg:text-2xl">
                                        {{ selectedChartCategory }}
                                        <v-menu activator="parent">
                                            <v-list>
                                                <v-list-item v-for="(item, index) in dropdownItems.chartCategory"
                                                    @click="selectChartCategory(item)" :key="index" :title="item.title"
                                                    v-model="selectedItems">
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-icon icon="mdi-menu-down"></v-icon>
                                    </button>
                                </div>
                            </div>
                            <div class="main-content graph">
                                <PeakPowerChart :chartId="deviceId" />
                            </div>
                            <div class="content-bottom flex flex-row justify-between">
                                <div class="min text-center">
                                    <p class="font-semibold">Min: 0 kW</p>
                                    <p class="text-gray-400">14 Aug 2022 at 14.00</p>
                                </div>
                                <div class="avg text-center">
                                    <p class="font-semibold">Avg: 0 kW</p>
                                </div>
                                <div class="max text-center">
                                    <p class="font-semibold">Max: 0 kW</p>
                                    <p class="text-gray-400">14 Aug 2022 at 14.00</p>
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

import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

import { PeakPowerChart, EditDevice, ModalDelete } from "@/utils/componentLoader";
import dynamicTitle from "@/utils/dynamicTitle";

const store = useStore();
const route = useRoute();
const router = useRouter();

const backendUrl = 'http://127.0.0.1:8000/api/devices/'
const deviceId = route.params.deviceId

// Refs + Computed -------
const devices = computed(() => store?.state?.device?.devices); // To get the category list
const device = computed(() => store?.state?.device?.devices.find(item => item.id === Number(deviceId)));
const editDialog = ref(false);
const deleteDialog = ref(false);
const deviceCategoryList = ref([]);
const dropdownItems = ref({
    chartCategory: [
        { title: 'Power Load', value: 'powerLoad' },
        { title: 'Energy Consumption', value: 'energyConsumption' }
    ]
}
);
const selectedChartCategory = ref("Energy Consumption");

// Methods -------
watch(device, () => {
    deviceCategoryList.value = [...new Set(devices.value.map(device => device.category))].map(item => { return { 'title': item, 'value': item.split(' ').join('') } });
});

const selectChartCategory = (item) => {
    selectedChartCategory.value = item.title
}

(function setTitleOnReload() {
    watch(device, () => {
        dynamicTitle(device?.value?.device_name)
    })
})();

(function setTitle() {
    dynamicTitle(device?.value?.device_name)
})();

// Async Methods --------
const updateDeviceState = async () => {
    const url = backendUrl + 'update_state/';
    const body = { state: !device.value.state };

    try {
        const data = await fetch(url + deviceId, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const json = await data.json();
        store.commit('_assign_updated_device', json);
    }
    catch (error) {
        alert(error);
        console.error(error);
    }
};

const updateDeviceFavorite = async () => {
    const url = backendUrl + 'update_favorite/';
    const body = { is_favorite: !device.value.is_favorite };

    try {
        const data = await fetch(url + deviceId, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const json = await data.json();
        store.commit('_assign_updated_device', json);
    }
    catch (error) {
        alert(error);
        console.error(error);
    }
};

const handleDeleteDevice = () => {
    const deleteDataDevice = async () => {
        try {
            await store.dispatch('_deleteDataDevice', deviceId);
            router.replace({ name: 'Devices' })
        }
        catch (error) {
            alert(error);
        }
    }
    deleteDataDevice();
}

</script>

