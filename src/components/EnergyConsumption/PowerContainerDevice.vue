<template>
    <div @click.stop.prevent="$event => router.replace({ name: 'Device Details', params: { deviceId: device.id } })"
        class="main cursor-pointer w-full h-96 mb-6 p-4 rounded-xl outline outline-2 outline-gray-200 hover:outline-sky-500 hover:shadow-lg ease-in-out transition-all">
        <!-- <RouterLink :to="{ name: 'Device Details', params: { deviceId: device.id } }"> -->
        <div class="device-container flex flex-row w-full h-full gap-6">
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
                class="device-usage flex flex-col items-center basis-[20%]  min-w-fit p-6 bg-slate-50 rounded-xl shadow justify-center">
                <v-icon icon="mdi-lightning-bolt" class="text-4xl lg:text-6xl text-sky-800 mb-4"></v-icon>
                <h3 class="font-semibold text-xl mb-1">Peak Power</h3>
                <div v-if="isLoading">
                    <GraphLoading />
                </div>
                <div v-else-if="selectedDate === 'Today' && !isLoading">
                    <h3 class="font-bold text-2xl lg:text-4xl mb-1">{{ totalPeakPowerToday?.kwh || 0 }}</h3>
                </div>
                <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                    <h3 class="font-bold text-2xl lg:text-4xl mb-1">{{ totalPeakPowerCurrentWeek?.kwh || 0 }}</h3>
                </div>
                <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                    <h3 class="font-bold text-2xl lg:text-4xl mb-1">{{ totalPeakPowerCurrentMonth?.kwh || 0 }}</h3>
                </div>

                <h4 class="text-base text-gray-400 mt-1">Watt (W)</h4>
                <div v-if="isLoading">
                    <GraphLoading />
                </div>
                <div v-else-if="selectedDate === 'Today' && !isLoading">
                    <p class="text-lg mt-2 text-gray-400">at <span class="font-bold">{{ totalPeakPowerToday?.hour ||
                        '00:00:00' }}</span></p>
                </div>
                <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                    <p class="text-lg mt-2 text-gray-400">at <span class="font-bold">{{ totalPeakPowerCurrentWeek?.date
                        || '00:00:00' }}</span></p>
                </div>
                <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                    <p class="text-lg mt-2 text-gray-400">at <span class="font-bold">{{
                        totalPeakPowerCurrentMonth?.week || '00:00:00' }}</span></p>
                </div>
            </div>
            <div v-ripple
                class="inline-block w-full h-full min-w-fit basis-[60%] p-6 bg-slate-50 rounded-xl shadow justify-center">
                <div v-if="isLoading">
                    <GraphLoading />
                </div>
                <div v-else-if="selectedDate === 'Today' && !isLoading">
                    <PeakPowerChart :chartId="chartId"
                        :past="devicePowers?.filter(item => String(item.date) === String(yesterday))?.map(item => chartObjectBuilder(item.hour, item.watt))"
                        :current="devicePowers?.filter(item => String(item.date) === String(today))?.map(item => chartObjectBuilder(item.hour, item.watt))"
                        :labels="devicePowers?.map(item => item.hour)" />
                </div>
                <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                    <PeakPowerChart :chartId="chartId"
                        :past="devicePowers?.filter(item => String(item.week) === String(pastWeek))?.map(item => chartObjectBuilder(item.date, item.watt))"
                        :current="devicePowers?.filter(item => String(item.week) === String(currentWeek))?.map(item => chartObjectBuilder(item.date, item.watt))"
                        :labels="devicePowers?.map(item => item.date)" />
                </div>
                <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                    <PeakPowerChart :chartId="chartId"
                        :past="devicePowers?.filter(item => String(item.month) === String(pastMonth))?.map(item => chartObjectBuilder(item.week, item.watt))"
                        :current="devicePowers?.filter(item => String(item.month) === String(currentMonth))?.map(item => chartObjectBuilder(item.week, item.watt))"
                        :labels="devicePowers?.map(item => item.week)" />
                </div>
            </div>
        </div>
        <!-- </RouterLink> -->
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { PeakPowerChart, GraphLoading, BasicLoading, LineLoading } from "@/utils/componentLoader.js";
import { today, yesterday, currentWeek, pastWeek, currentMonth, pastMonth } from '@/utils/getTime';
import { chartObjectBuilder } from '@/utils/chartObjectBuilder';

const store = useStore();
const router = useRouter()
const { chartId, device, selectedDate, isLoading } = defineProps(['chartId', 'device', 'selectedDate', 'isLoading']);

// Device Powers (Chart) -----
const devicePowers = computed(() => store?.state?.deviceUsage?.deviceUsages?.filter(item => item.user_device_id === device.id) || []);

// Peak Power by time range -----
const totalPeakPowerToday = computed(() => store?.state?.deviceUsage?.deviceUsages
    ?.filter(item => String(item.date) === String(today))
    ?.filter(item => Number(item.user_device_id) === Number(device.id)) // filter instead because it will be reduced 
    ?.reduce((prev, current) => (prev.watt > current.watt) ? prev : current, 0) || 0);
const totalPeakPowerCurrentWeek = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.week) === String(currentWeek))
    ?.reduce((prev, current) => (prev.watt > current.watt) ? prev : current, 0) || 0);
const totalPeakPowerCurrentMonth = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.month) === String(currentMonth))
    ?.reduce((prev, current) => (prev.watt > current.watt) ? prev : current, 0) || 0);

</script>