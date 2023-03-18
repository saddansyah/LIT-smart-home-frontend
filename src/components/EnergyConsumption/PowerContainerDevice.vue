<template>
    <RouterLink :to="{ name: 'Device Details', params: { deviceId: device.id } }">
        <div
            class="main w-full h-64 mb-6 p-4 rounded-xl outline outline-2 outline-gray-200 hover:outline-sky-500 hover:shadow-lg ease-in-out transition-all">
            <div class="device-container flex flex-row w-full h-full gap-6">
                <div v-ripple class="device-title flex flex-col basis-[20%] min-w-fit p-6 bg-slate-50 rounded-xl shadow ">
                    <v-icon :icon="device.icon_url" class="text-4xl lg:text-6xl text-sky-800 mb-4"></v-icon>
                    <div class="content-center-top">
                        <h3 class="font-bold text-2xl lg:text-3xl mb-1">{{ device.device_name }}</h3>
                        <v-chip size="small" color="green" class="font-semibold">{{ device.category }}</v-chip>
                        <div v-if="device.state">
                            <h4 class="text-base mt-1">State: ON</h4>
                        </div>
                        <div v-else>
                            <h4 class="text-base mt-1">State: OFF</h4>
                        </div>
                    </div>
                </div>

                <div v-ripple
                    class="device-usage flex flex-col items-center basis-[30%]  min-w-fit p-6 bg-slate-50 rounded-xl shadow">
                    <v-icon icon="mdi-lightning-bolt" class="text-4xl lg:text-6xl text-sky-800 mb-4"></v-icon>
                    <h3 class="font-semibold text-xl mb-1">Peak Power</h3>
                    <h3 class="font-bold text-2xl lg:text-4xl mb-1">{{ device.watt }}</h3>
                    <h4 class="text-base text-gray-400 mt-1">kilowatt (kW)</h4>
                </div>
                <div v-ripple class="inline-block w-full h-full min-w-fit basis-[50%] p-6 bg-slate-50 rounded-xl shadow">
                    <PeakPowerChart :chartId="chartId" />
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { PeakPowerChart } from "@/utils/componentLoader.js";


defineProps({
    chartId: Number,
    device: Object
});


</script>