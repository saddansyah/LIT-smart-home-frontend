<template>
    <!-- <RouterLink :to="{ name: 'Device Details', params: { deviceId: device.id } }"> -->
    <div @click.stop="$event => router.replace({ name: 'Device Details', params: { deviceId: device.id } })"
        class="main cursor-pointer w-full h-fit mb-6 p-4 rounded-xl outline outline-2 outline-gray-200 hover:outline-sky-500 hover:shadow-lg ease-in-out transition-all">
        <div class="device-container flex flex-col lg:flex-row w-full h-full gap-6">
            <div v-ripple
                class="device-title flex flex-col basis-[20%] min-w-fit p-6 bg-slate-50 rounded-xl shadow justify-center">
                <v-icon :icon="device.icon_url" class="text-4xl lg:text-6xl text-sky-800 mb-4"></v-icon>
                <div class="content-center-top">
                    <h3 class="font-bold text-2xl lg:text-3xl mb-1">{{ device.device_name.length > 14 ?
                        device.device_name.substr(0, 12)
                        + '...' : device.device_name }}</h3>
                    <v-chip size="small" color="green" class="font-semibold">{{ device.category }}</v-chip>
                    <div v-if="device.state">
                        <v-chip prepend-icon="mdi-power" color="blue" class="mt-3 font-semibold animation-pulse">ON</v-chip>
                    </div>
                </div>
            </div>

            <div v-ripple
                class="device-usage flex flex-col items-center basis-[20%]  p-6 bg-slate-50 rounded-xl shadow justify-center">
                <v-icon icon="mdi-lightning-bolt" class="text-4xl lg:text-6xl text-sky-800 mb-4"></v-icon>
                <h3 class="font-semibold text-xl mb-1">Energy Usage</h3>
                <h3 class="font-bold text-2xl lg:text-4xl mb-1">{{ lastDeviceUsages.kwh || 0 }}</h3>
                <h4 class="text-base text-gray-400 mt-1">kilowatt-hour (kWH)</h4>
            </div>
            <div v-ripple class="hidden lg:block min-w-fit basis-[60%] p-6 bg-slate-50 rounded-xl shadow">
                <div v-if="isLoading">
                    <GraphLoading />
                </div>
                <div v-else-if="selectedDate === 'Today' && !isLoading">
                    <EnergyUsageChart :chartId="chartId"
                        :past="deviceUsages?.filter(item => String(item.date) === String(yesterday))?.map(item => chartObjectBuilder(item.hour, item.kwh))"
                        :current="deviceUsages?.filter(item => String(item.date) === String(today))?.map(item => chartObjectBuilder(item.hour, item.kwh))"
                        :labels="deviceUsages?.map(item => item.hour)" />
                </div>
                <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                    <EnergyUsageChart :chartId="chartId"
                        :past="deviceUsages?.filter(item => String(item.week) === String(pastWeek))?.map(item => chartObjectBuilder(item.date, item.kwh))"
                        :current="deviceUsages?.filter(item => String(item.week) === String(currentWeek))?.map(item => chartObjectBuilder(item.date, item.kwh))"
                        :labels="deviceUsages?.map(item => item.date)" />
                </div>
                <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                    <EnergyUsageChart :chartId="chartId"
                        :past="deviceUsages?.filter(item => String(item.month) === String(pastMonth))?.map(item => chartObjectBuilder(item.week, item.kwh))"
                        :current="deviceUsages?.filter(item => String(item.month) === String(currentMonth))?.map(item => chartObjectBuilder(item.week, item.kwh))"
                        :labels="deviceUsages?.map(item => item.week)" />
                </div>
            </div>
        </div>
    </div>
    <!-- </RouterLink> -->
</template>

<script setup>
import { EnergyUsageChart, GraphLoading, BasicLoading } from "@/utils/componentLoader.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";


import { today, yesterday, currentWeek, pastWeek, currentMonth, pastMonth } from '@/utils/getTime';
import { chartObjectBuilder } from '@/utils/chartObjectBuilder';

const store = useStore();
const router = useRouter();
const { chartId, device, selectedDate, isLoading } = defineProps(['chartId', 'device', 'selectedDate', 'isLoading']);

// Device Usages (Chart) -----
const deviceUsages = computed(() => store?.state?.deviceUsage?.deviceUsages?.filter(item => item.user_device_id === device.id));
const lastDeviceUsages = computed(() => store?.state?.deviceUsage?.deviceUsages
    ?.filter(item => item.user_device_id === device.id)
    ?.find((item, index, array) => { return index === (array.length - 1) }) || 0);

</script>