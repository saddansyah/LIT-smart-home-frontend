<template>
    <div class="main inline-block w-full">
        <div class="main-top flex w-full h-fit lg:flex-row gap-6">
            <div v-ripple
                class="energy-usage basis-1/2 flex flex-col w-fit gap-6 rounded-xl shadow bg-slate-50 hover:bg-slate-200 transition-all p-6 ">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Energy Usage</h3>
                <div class="energy-usage-main flex gap-2 items-center">
                    <div class="text-6xl lg:text-8xl">⚡</div>
                    <div class="content-right">
                        <div v-if="!totalUsagesToday">
                            <div class="w-72">
                                <BasicLoading />
                            </div>
                        </div>
                        <div v-else>
                            <h3 class="text-4xl lg:text-6xl font-bold">{{ totalUsagesToday }}</h3>
                            <p class="text-xl text-gray-600">kilo-watt hour (kWH)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-ripple
                class="energy-limit basis-1/2 flex flex-col gap-6 rounded-xl w-fit shadow bg-slate-50 hover:bg-slate-200 transition-all p-6">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Energy Goal</h3>
                <div class="energy-usage-main">
                    <div v-if="!totalUsagesToday">
                        <div class="w-72">
                            <BasicLoading />
                        </div>
                    </div>
                    <div v-else>
                        <div class="energy-usage-main flex gap-2 items-center">
                            <div class="mr-4 text-2xl">
                                <v-progress-circular :rotate="360" :size="150" :width="25" :model-value="percentage"
                                    color="#0ea5e9">
                                    {{ percentage }}%
                                </v-progress-circular>
                            </div>
                            <div class="content-right">
                                <h3 class="text-2xl lg:text-4xl font-bold">{{ totalUsagesToday }} W</h3>
                                <p class="text-xl text-gray-600">from goals: {{ limit }} kWH</p>
                                <v-chip size="large" :color="percentageCategory < 90 ? 'green' : 'amber'"
                                    class="font-semibold">{{ percentageCategory < 90 ? 'Safe' : 'Warning' }}</v-chip>
                                        <p class="text-base mt-4 underline text-gray-400">Set your goals here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-ripple
            class="energy-chart mt-6 rounded-xl w-full fit shadow bg-slate-50 hover:bg-slate-200 transition-all p-6">
            <div class="content-top flex justify-between items-start">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Energy Chart</h3>
                <button v-ripple
                    class="inline-block px-4 py-2 rounded-lg font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg">
                    Refresh <v-icon icon="mdi-refresh"></v-icon>
                </button>
            </div>
            <div class="chart mt-6">
                <div v-if="!totalUsagesToday">
                    <GraphLoading />
                </div>
                <div v-else>
                    <EnergyUsageChart chartId="energyUsageChart" :data="totalUsages" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EnergyUsageChart, BasicLoading, GraphLoading } from "@/utils/componentLoader.js";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const totalUsages = computed(() => store?.state.deviceUsage.totalUsages);
const totalUsagesToday = computed(() => store?.state?.deviceUsage?.totalUsages[store.state.deviceUsage.totalUsages.length - 1]?.kwh);

// Energy Goals
const limit = ref(5);
const percentage = computed(() => Math.round((totalUsagesToday.value / limit.value) * 100));
const percentageCategory = ref('');

</script>