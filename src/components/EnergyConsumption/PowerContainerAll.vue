<template>
    <div class="main inline-block w-full">
        <div class="main-top flex w-full h-fit lg:flex-row gap-6">
            <div v-ripple
                class="energy-usage basis-1/2 flex flex-col w-fit gap-6 rounded-xl shadow bg-slate-50 hover:bg-slate-200 transition-all p-6 ">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Peak Power</h3>
                <div class="energy-usage-main flex gap-2 items-center">
                    <div class="text-6xl lg:text-8xl">⚡</div>
                    <div class="content-right">
                        <h3 class="text-6xl lg:text-8xl font-bold">740</h3>
                        <p class="text-xl text-gray-600">kilo-watt (kW)</p>
                    </div>
                </div>
            </div>
            <div v-ripple
                class="energy-limit basis-1/2 flex flex-col gap-6 rounded-xl w-fit shadow bg-slate-50 hover:bg-slate-200 transition-all p-6">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Power Limit</h3>
                <div class="energy-usage-main">
                    <div class="energy-usage-main flex gap-2 items-center">
                        <div class="mr-4 text-2xl">
                            <v-progress-circular :rotate="360" :size="150" :width="25" :model-value="value" color="#0ea5e9">
                                {{ value }}%
                            </v-progress-circular>
                        </div>
                        <div class="content-right">
                            <h3 class="text-2xl lg:text-4xl font-bold">12 W</h3>
                            <p class="text-xl text-gray-600">from limit: {{ limit }} VA</p>
                            <v-chip size="large" color="green" class="font-semibold">Safe</v-chip>
                            <p class="text-base mt-4 underline text-gray-400">Set your usage limit here</p>
                            <p class="text-base underline text-gray-400">See your electricity cost here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-ripple
            class="energy-chart mt-6 rounded-xl w-full h-fit shadow bg-slate-50 hover:bg-slate-200 transition-all p-6">
            <div class="content-top flex justify-between items-start">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Power Chart</h3>
                <button v-ripple
                    class="inline-block px-4 py-2 rounded-lg font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg">
                    Refresh <v-icon icon="mdi-refresh"></v-icon>
                </button>
            </div>
            <div class="chart mt-6">
                <PeakPowerChart chartId="powerConsumptionChart" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { PeakPowerChart } from "@/utils/componentLoader.js";
import { computed, ref } from "vue";

const limit = ref(900);
const watt = ref(310);
const value = computed(() => Math.round((watt.value/limit.value)*100));

</script>