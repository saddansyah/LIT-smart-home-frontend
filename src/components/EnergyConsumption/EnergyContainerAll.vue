<template>
    <div class="main inline-block w-full">
        <div class="main-top flex w-full h-fit lg:flex-row gap-6">
            <div v-ripple
                class="energy-usage basis-1/2 flex flex-col w-fit gap-6 rounded-xl shadow bg-slate-50 hover:bg-slate-200 transition-all p-6 ">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Energy Usage</h3>
                <div class="energy-usage-main flex gap-2 items-center">
                    <div class="text-6xl lg:text-8xl">⚡</div>
                    <div class="content-right">
                        <div v-if="isLoading">
                            <div class="w-72">
                                <BasicLoading />
                            </div>
                        </div>
                        <div v-else-if="selectedDate === 'Today' && !isLoading">
                            <h3 class="text-4xl lg:text-6xl font-bold">
                                {{ totalUsagesToday?.kwh || 0 }}
                            </h3>
                        </div>
                        <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                            <h3 class="text-4xl lg:text-6xl font-bold">
                                {{ totalUsagesCurrentWeek?.kwh || 0 }}
                            </h3>
                        </div>
                        <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                            <h3 class="text-4xl lg:text-6xl font-bold">
                                {{ totalUsagesCurrentMonth?.kwh || 0 }}
                            </h3>
                        </div>
                        <p class="text-xl text-gray-600">kilo-watt hour (kWH)</p>
                    </div>
                </div>
            </div>
            <div v-ripple
                class="energy-limit basis-1/2 flex flex-col gap-6 rounded-xl w-fit shadow bg-slate-50 hover:bg-slate-200 transition-all p-6">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Energy Goal</h3>
                <div class="energy-usage-main">
                    <div v-if="isLoading">
                        <BasicLoading />
                    </div>
                    <div v-else-if="selectedDate === 'Today' && !isLoading">
                        <div class="energy-usage-main flex gap-2 items-center">
                            <div class="mr-4 text-2xl">
                                <v-progress-circular :rotate="360" :size="150" :width="25"
                                    :model-value="goalPercentageToday" color="#0ea5e9">
                                    {{ goalPercentageToday }}%
                                </v-progress-circular>
                            </div>
                            <div class="content-right">
                                <h3 class="text-2xl lg:text-4xl font-bold">{{ totalUsagesToday[totalUsagesToday.length -
                                    1]?.kwh ?? 0 }} kWH</h3>
                                <p class="text-xl text-gray-600">from goals: {{ energyGoalToday }} kWH</p>
                                <v-chip size="large" :color="Number(goalPercentageToday) < 90 ? 'green' : 'amber'"
                                    class="font-semibold">{{ Number(goalPercentageToday) < 90 ? 'Safe' : 'Warning'
                                    }}</v-chip>
                                        <p class="text-base mt-4 underline text-gray-400">Set your goals here</p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                        <div class="energy-usage-main flex gap-2 items-center">
                            <div class="mr-4 text-2xl">
                                <v-progress-circular :rotate="360" :size="150" :width="25"
                                    :model-value="goalPercentageWeekly" color="#0ea5e9">
                                    {{ goalPercentageWeekly }}%
                                </v-progress-circular>
                            </div>
                            <div class="content-right">
                                <h3 class="text-2xl lg:text-4xl font-bold">{{
                                    totalUsagesCurrentWeek[totalUsagesCurrentWeek.length - 1]?.kwh ?? 0 }} kWH</h3>
                                <p class="text-xl text-gray-600">from goals: {{ energyGoalWeekly }} kWH</p>
                                <v-chip size="large" :color="goalPercentageWeekly < 90 ? 'green' : 'amber'"
                                    class="font-semibold">{{ goalPercentageWeekly < 90 ? 'Safe' : 'Warning' }}</v-chip>
                                        <p class="text-base mt-4 underline text-gray-400">Set your goals here</p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                        <div class="energy-usage-main flex gap-2 items-center">
                            <div class="mr-4 text-2xl">
                                <v-progress-circular :rotate="360" :size="150" :width="25"
                                    :model-value="goalPercentageMonthly" color="#0ea5e9">
                                    {{ goalPercentageMonthly }}%
                                </v-progress-circular>
                            </div>
                            <div class="content-right">
                                <h3 class="text-2xl lg:text-4xl font-bold">{{
                                    totalUsagesCurrentMonth[totalUsagesCurrentMonth.length - 1]?.kwh ?? 0 }} kWH</h3>
                                <p class="text-xl text-gray-600">from goals: {{ energyGoalMonthly }} kWH</p>
                                <v-chip size="large" :color="goalPercentageMonthly < 90 ? 'green' : 'amber'"
                                    class="font-semibold">{{ goalPercentageMonthly < 90 ? 'Safe' : 'Warning' }}</v-chip>
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
                <button v-ripple @click="$event => $emit('refreshChart')"
                    class="inline-block px-4 py-2 rounded-lg font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg">
                    <div v-if="isLoading">
                        <ButtonLoading />
                    </div>
                    <div v-else>
                        Refresh <v-icon icon="mdi-refresh"></v-icon>
                    </div>
                </button>
            </div>
            <div class="chart mt-6">
                <div v-if="isLoading">
                    <GraphLoading />
                </div>
                <div v-else-if="selectedDate === 'Today' && !isLoading">
                    <EnergyUsageChart chartId="todayEnergyChart"
                        :past="totalUsages?.filter(item => String(item.date) === String(yesterday))?.map(item => chartObjectBuilder(item.hour, item.kwh))"
                        :current="totalUsages?.filter(item => String(item.date) === String(today))?.map(item => chartObjectBuilder(item.hour, item.kwh))"
                        :labels="totalUsages?.map(item => item.hour)" />
                </div>
                <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                    <EnergyUsageChart chartId="weeklyEnergyChart"
                        :past="totalUsages?.filter(item => String(item.week) === String(pastWeek))?.map(item => chartObjectBuilder(item.date, item.kwh))"
                        :current="totalUsages?.filter(item => String(item.week) === String(currentWeek))?.map(item => chartObjectBuilder(item.date, item.kwh))"
                        :labels="totalUsages?.map(item => item.date)" />
                </div>
                <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                    <EnergyUsageChart chartId="monthlyEnergyChart"
                        :past="totalUsages?.filter(item => String(item.month) === String(pastMonth))?.map(item => chartObjectBuilder(item.week, item.kwh))"
                        :current="totalUsages?.filter(item => String(item.month) === String(currentMonth))?.map(item => chartObjectBuilder(item.week, item.kwh))"
                        :labels="totalUsages?.map(item => item.week)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import { EnergyUsageChart, BasicLoading, GraphLoading, ButtonLoading } from "@/utils/componentLoader.js";
import { today, yesterday, currentWeek, pastWeek, currentMonth, pastMonth } from '@/utils/getTime';
import { chartObjectBuilder } from '@/utils/chartObjectBuilder';

const store = useStore();
const { selectedDate, isLoading } = defineProps(['selectedDate', 'isLoading'])

// Total Usages (Chart) -----
const totalUsages = computed(() => store?.state?.deviceUsage?.totalUsages);

// Total Usages by time range -----
const totalUsagesToday = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.date) === String(today))
    ?.find((item, index, array) => { return index === (array.length - 1) }) || 0);
const totalUsagesCurrentWeek = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.week) === String(currentWeek))
    ?.find((item, index, array) => { return index === (array.length - 1) }) || 0);
const totalUsagesCurrentMonth = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.month) === String(currentMonth))
    ?.find((item, index, array) => { return index === (array.length - 1) }) || 0);

// Energy Goal -----
const energyGoal = 1.18 // Soon choosed by user
const energyGoalToday = ref(energyGoal);
const energyGoalWeekly = ref(energyGoal * 7);
const energyGoalMonthly = ref(energyGoal * 30);

const goalPercentageToday = computed(() => Math.round((Number(totalUsagesToday.value?.kwh) / Number(energyGoalToday.value)) * 100) || 0);
const goalPercentageWeekly = computed(() => Math.round((Number(totalUsagesCurrentWeek.value?.kwh) / Number(energyGoalWeekly.value)) * 100) || 0);
const goalPercentageMonthly = computed(() => Math.round((Number(totalUsagesCurrentMonth.value?.kwh) / Number(energyGoalMonthly.value)) * 100) || 0);

</script>