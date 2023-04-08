<template>
    <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
        <div v-if="isDeviceLoading">
            <MainDashboardLoading />
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
                    <v-dialog v-model="editDialog" persistent>
                        <template v-slot:activator="{ props }">
                            <button v-ripple v-bind="props"
                                class="self-start h-fit w-full mt-3 px-4 py-2 rounded-lg font-semibold text-white bg-sky-600 shadow-lg">Edit
                                <v-icon icon="mdi-pencil"></v-icon></button>
                        </template>
                        <EditDevice @close="$event => editDialog = false" :device="device" @notify="emitNotify" />
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
                                <h3 class="font-bold text-xl lg:text-2xl inline-block">Today Energy Usage</h3>
                            </div>
                            <div class="main-content flex flex-row gap-4 items-center">
                                <div class="text-6xl lg:text-8xl">⚡</div>
                                <div>
                                    <h3 class="text-2xl lg:text-4xl font-bold">{{ deviceUsagesToday.kwh || 0 }}</h3>
                                    <h1 class="text-xl lg:text-2xl text-gray-400">kilowatt-hour (kWh)</h1>
                                </div>
                            </div>
                            <div class="daily-goal">
                                <h3 class="font-bold text-xl inline-block">Average Daily Usage:</h3>
                                <h4 class="text-lg"><span class="font-bold text-2xl">{{ deviceUsagesToday.kwh || 0 }}</span> kWH
                                </h4>
                            </div>
                        </div>
                        <!-- Card 2 -->
                        <div v-ripple
                            class="flex flex-col gap-6 md:col-span-1 lg:col-span-2 lg:row-start-3 p-6 bg-neutral-50 rounded-xl shadow hover:bg-gray-200 transition-all">
                            <div class="content-top flex flex-row justify-between gap-8">
                                <h3 class="font-bold text-xl inline-block">Today Peak Power</h3>
                                <v-tooltip location="top"
                                    text="Device's peak power (watt) within a certain time limit (daily, weekly, etc)">
                                    <template v-slot:activator="{ props }">
                                        <v-icon v-bind="props" icon="mdi-information-outline" class="text-gray-400" />
                                    </template>
                                </v-tooltip>
                            </div>
                            <div class="main-content flex flex-row justify-between items-center">
                                <div class="main-content-left flex flex-col">
                                    <h3 class="text-2xl lg:text-6xl font-bold">{{ devicePeakPowerToday.watt || 0 }}</h3>
                                    <h1 class="text-xl self-start text-gray-400">Watt</h1>
                                </div>
                                <div class="main-content-right text-xl flex flex-col items-end text-gray-400">
                                    <div class="voltage flex gap-2">
                                        <v-icon icon="mdi-flash-triangle"></v-icon>
                                        <h4>{{ device.volt }} V</h4>
                                    </div>
                                    <div class="ampere flex gap-2">
                                        <v-icon icon="mdi-current-dc"></v-icon>
                                        <h4>{{ device.ampere }} A</h4>
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
                                            <v-list v-model="chartCategory">
                                                <v-list-item v-for="(item, index) in dropdownItems.chartCategory"
                                                    :value="item.value" @click="selectChartCategory(item)" :key="index"
                                                    :title="item.title">
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-icon icon="mdi-menu-down"></v-icon>
                                    </button>
                                </div>
                            </div>
                            <div v-if="isUsageLoading">
                                <GraphLoading />
                            </div>
                            <div v-else>
                                <v-window direction="vertical" v-model="chartCategory" class="p-1">
                                    <v-window-item value="energyUsage">
                                        <div class="chart h-96">
                                            <EnergyUsageChart chartId="todayEnergyChart"
                                                :past="deviceUsages?.filter(item => String(item.date) === String(yesterday))?.map(item => chartObjectBuilder(item.hour, item.kwh))"
                                                :current="deviceUsages?.filter(item => String(item.date) === String(today))?.map(item => chartObjectBuilder(item.hour, item.kwh))"
                                                :labels="deviceUsages?.map(item => item.hour)" />
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
                                    </v-window-item>
                                    <v-window-item value="powerLoad">
                                        <div class="chart h-96">
                                            <PeakPowerChart chartId="todayPowerChart"
                                                :past="devicePowers?.filter(item => String(item.date) === String(yesterday))?.map(item => chartObjectBuilder(item.hour, item.watt))"
                                                :current="devicePowers?.filter(item => String(item.date) === String(today))?.map(item => chartObjectBuilder(item.hour, item.watt))"
                                                :labels="devicePowers?.map(item => item.hour)" />
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
                                    </v-window-item>
                                </v-window>
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

import { PeakPowerChart, EnergyUsageChart, EditDevice, ModalDelete, NotifySnackbar, GraphLoading, MainDashboardLoading } from "@/utils/componentLoader";
import { today, yesterday, currentWeek, pastWeek, currentMonth, pastMonth } from '@/utils/getTime';
import { chartObjectBuilder } from '@/utils/chartObjectBuilder';
import dynamicTitle from "@/utils/dynamicTitle";

const store = useStore();
const route = useRoute();
const router = useRouter();
const emit = defineEmits(['notify'])

// Pre-fetch total usage ----
const { isDeviceLoading } = defineProps(['isDeviceLoading']);
const isUsageLoading = ref(false)
async function fetchTotalUsage(timeRange) {
    try {
        isUsageLoading.value = true
        await store.dispatch('_fetchDataTotalUsages', timeRange);
        isUsageLoading.value = false
    }
    catch (error) {
        emit('notify', true, false, error);
        console.error(error);
    }
};
fetchTotalUsage('hourly');

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const deviceId = route.params.deviceId;

// Refs + Computed -------
const device = computed(() => store?.state?.device?.devices.find(item => item.id === Number(deviceId)));

const deviceUsages = computed(() => store?.state?.deviceUsage?.deviceUsages?.filter(item => Number(item.user_device_id) === Number(device.value.id)) || []);
const deviceUsagesToday = computed(() => store?.state?.deviceUsage?.deviceUsages
    ?.filter(item => String(item.date) == String(today))
    ?.find(item => Number(item.user_device_id) === Number(deviceId)) || 0);

const devicePowers = deviceUsages;
const devicePeakPowerToday = computed(() => store?.state?.deviceUsage?.deviceUsages
    ?.filter(item => String(item.date) === String(today))
    ?.filter(item => Number(item.user_device_id) === Number(deviceId))
    ?.reduce((prev, current) => (prev.watt > current.watt) ? prev : current, 0) || 0);


const editDialog = ref(false);
const deleteDialog = ref(false);
const chartCategory = ref('energyUsage');
const dropdownItems = ref({
    chartCategory: [
        { title: 'Energy Usage', value: 'energyUsage' },
        { title: 'Power Load', value: 'powerLoad' },
    ]
}
);
const selectedChartCategory = ref("Energy Usage");

// Methods
const emitNotify = (state, success, message) => {
    emit('notify', state, success, message)
}

const selectChartCategory = (item) => {
    selectedChartCategory.value = item.title
    chartCategory.value = item.value
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
    const url = `${BASE_URL}/user_devices/update_state/${deviceId}`
    const body = { state: !device.value.state };

    try {
        const data = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const json = await data.json();
        store.commit('_assign_updated_device', json);

        if (json.state) {
            emitNotify(true, true, `${json.device_name} is on`)
        }
        else {
            emitNotify(true, true, `${json.device_name} is off`)
        }

    }
    catch (error) {
        emitNotify(true, false, error);
    }
};

const updateDeviceFavorite = async () => {
    const url = `${BASE_URL}/user_devices/update_favorite/${deviceId}`
    const body = { is_favorite: !device.value.is_favorite };
    try {
        const data = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const json = await data.json();
        store.commit('_assign_updated_device', json);

        if (json.is_favorite) {
            emitNotify(true, true, `${json.device_name} is your favorite(s)`)
        }
        else {
            emitNotify(true, true, `${json.device_name} is removed from your favorite(s)`)
        }
    }
    catch (error) {
        emitNotify(true, false, error);
    }
};

const handleDeleteDevice = () => {
    const deleteDataDevice = async () => {
        try {
            const device = await store.dispatch('_deleteDataDevice', deviceId);
            console.log(device)
            emitNotify(true, false, `${device.data.device_name} is deleted`);
            router.replace({ name: 'Devices' })
        }
        catch (error) {
            emitNotify(true, false, error);
            console.error(error);
        }
    }
    deleteDataDevice();
}

</script>

