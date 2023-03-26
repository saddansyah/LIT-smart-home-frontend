<template>
    <RouterLink :to="{ name: 'Device Details', params: { deviceId: device.id } }">
        <div
            class="main w-full h-96 mb-6 p-4 rounded-xl outline outline-2 outline-gray-200 hover:outline-sky-500 hover:shadow-lg ease-in-out transition-all">
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
                            <v-chip prepend-icon="mdi-power" color="blue"
                                class="mt-3 font-semibold animation-pulse">ON</v-chip>
                        </div>
                    </div>
                </div>

                <div v-ripple
                    class="device-usage flex flex-col items-center basis-[20%]  p-6 bg-slate-50 rounded-xl shadow justify-center">
                    <v-icon icon="mdi-lightning-bolt" class="text-4xl lg:text-6xl text-sky-800 mb-4"></v-icon>
                    <h3 class="font-semibold text-xl mb-1">Energy Usage</h3>
                    <h3 class="font-bold text-2xl lg:text-4xl mb-1">{{ device.last_kwh }}</h3>
                    <h4 class="text-base text-gray-400 mt-1">kilowatt-hour (kWH)</h4>
                </div>
                <div v-ripple class="inline-block w-full h-full min-w-fit basis-[60%] p-6 bg-slate-50 rounded-xl shadow">
                    <div v-if="!totalUsages[0]">
                        <GraphLoading/>
                    </div>
                    <div v-else>
                        <div></div>
                        <EnergyUsageChart :chartId="chartId" :data="deviceUsages" />
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { EnergyUsageChart, GraphLoading } from "@/utils/componentLoader.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { today, yesterday } from '@/utils/getTime';

const store = useStore();

const totalUsages = computed(() => store?.state?.deviceUsage?.totalUsages);
const deviceUsages = computed(() => store?.state?.deviceUsage?.deviceUsages?.filter(item => item.device_id === device.id));

const { chartId, device } = defineProps({
    chartId: Number,
    device: Object,
});


</script>