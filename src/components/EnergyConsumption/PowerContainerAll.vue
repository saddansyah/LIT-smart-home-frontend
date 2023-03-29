<template>
    <div class="main inline-block w-full">
        <div class="main-top flex w-full h-fit lg:flex-row gap-6">
            <div v-ripple
                class="energy-usage basis-1/2 flex flex-col w-fit gap-6 rounded-xl shadow bg-slate-50 hover:bg-slate-200 transition-all p-6 ">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Peak Power</h3>
                <div class="energy-usage-main flex gap-2 items-center ">
                    <div class="text-6xl lg:text-8xl">⚡</div>
                    <div class="content-right">
                        <div v-if="isLoading">
                            <div class="w-72">
                                <BasicLoading />
                            </div>
                        </div>
                        <div v-else-if="selectedDate === 'Today' && !isLoading">
                            <h3 class="text-4xl lg:text-6xl font-bold">
                                {{ totalPeakPowerToday?.watt ?? 0 }}
                            </h3>
                            <p class="text-xl text-gray-600">watt (w)</p>
                            <p class="text-lg mt-2 text-gray-400">at <span class="font-bold">{{ totalPeakPowerToday?.hour
                            }}</span></p>
                        </div>
                        <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                            <h3 class="text-4xl lg:text-6xl font-bold">
                                {{ totalPeakPowerCurrentWeek?.watt ?? 0 }}
                            </h3>
                            <p class="text-xl text-gray-600">watt (w)</p>
                            <p class="text-lg mt-2 text-gray-400">at <span class="font-bold">{{
                                totalPeakPowerCurrentWeek?.date }}</span></p>
                        </div>
                        <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                            <h3 class="text-4xl lg:text-6xl font-bold">
                                {{ totalPeakPowerCurrentMonth?.watt ?? 0 }}
                            </h3>
                            <p class="text-xl text-gray-600">watt (w)</p>
                            <p class="text-lg mt-2 text-gray-400">at <span class="font-bold">{{
                                totalPeakPowerCurrentMonth?.week }}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-ripple
                class="energy-limit basis-1/2 flex flex-col gap-6 rounded-xl w-fit shadow bg-slate-50 hover:bg-slate-200 transition-all p-6">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Power Limit</h3>
                <div class="power-limit-main">
                    <div v-if="isLoading">
                        <BasicLoading />
                    </div>
                    <div v-else-if="selectedDate === 'Today' && !isLoading">
                        <div class="energy-usage-main flex gap-2 items-center">
                            <div class="mr-4 text-2xl">
                                <v-progress-circular :rotate="360" :size="150" :width="25"
                                    :model-value="powerPercentageToday" color="#0ea5e9">
                                    {{ powerPercentageToday }}%
                                </v-progress-circular>
                            </div>
                            <div class="content-right">
                                <h3 class="text-2xl lg:text-4xl font-bold">{{ totalUsedPowerToday?.watt ?? 0 }} w</h3>
                                <p class="text-xl text-gray-600">from goals: {{ powerLimitToday }} VA</p>
                                <v-chip size="large" :color="Number(powerPercentageToday) < 90 ? 'green' : 'amber'"
                                    class="font-semibold">{{ Number(powerPercentageToday) < 90 ? 'Safe' : 'Warning'
                                    }}</v-chip>
                                        <p class="text-base mt-4 underline text-gray-400">Set your limit here</p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                        <div class="energy-usage-main flex gap-2 items-center">
                            <div class="mr-4 text-2xl">
                                <v-progress-circular :rotate="360" :size="150" :width="25"
                                    :model-value="powerPercentageWeekly" color="#0ea5e9">
                                    {{ powerPercentageWeekly }}%
                                </v-progress-circular>
                            </div>
                            <div class="content-right">
                                <h3 class="text-2xl lg:text-4xl font-bold">{{ totalUsedPowerCurrentWeek?.watt ?? 0 }} w
                                </h3>
                                <p class="text-xl text-gray-600">from goals: {{ powerLimitWeekly }} watt</p>
                                <v-chip size="large" :color="powerPercentageWeekly < 90 ? 'green' : 'amber'"
                                    class="font-semibold">{{ powerPercentageWeekly < 90 ? 'Safe' : 'Warning' }}</v-chip>
                                        <p class="text-base mt-4 underline text-gray-400">Set your goals here</p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                        <div class="energy-usage-main flex gap-2 items-center">
                            <div class="mr-4 text-2xl">
                                <v-progress-circular :rotate="360" :size="150" :width="25"
                                    :model-value="powerPercentageMonthly" color="#0ea5e9">
                                    {{ powerPercentageMonthly }}%
                                </v-progress-circular>
                            </div>
                            <div class="content-right">
                                <h3 class="text-2xl lg:text-4xl font-bold">{{ totalUsedPowerCurrentMonth?.watt ?? 0 }} w
                                </h3>
                                <p class="text-xl text-gray-600">from goals: {{ powerLimitMonthly }} watt</p>
                                <v-chip size="large" :color="powerPercentageMonthly < 90 ? 'green' : 'amber'"
                                    class="font-semibold">{{ powerPercentageMonthly < 90 ? 'Safe' : 'Warning' }}</v-chip>
                                        <p class="text-base mt-4 underline text-gray-400">Set your goals here</p>
                            </div>
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
                <div v-if="isLoading">
                    <GraphLoading />
                </div>
                <div v-else-if="selectedDate === 'Today' && !isLoading">
                    <PeakPowerChart chartId="todayPowerChart"
                        :past="totalPower?.filter(item => String(item.date) === String(yesterday))?.map(item => chartObjectBuilder(item.hour, item.watt))"
                        :current="totalPower?.filter(item => String(item.date) === String(today))?.map(item => chartObjectBuilder(item.hour, item.watt))"
                        :labels="totalPower?.map(item => item.hour)" />
                </div>
                <div v-else-if="selectedDate === 'Weekly' && !isLoading">
                    <PeakPowerChart chartId="weeklyPowerChart"
                        :past="totalPower?.filter(item => String(item.week) === String(pastWeek))?.map(item => chartObjectBuilder(item.date, item.watt))"
                        :current="totalPower?.filter(item => String(item.week) === String(currentWeek))?.map(item => chartObjectBuilder(item.date, item.watt))"
                        :labels="totalPower?.map(item => item.date)" />
                </div>
                <div v-else-if="selectedDate === 'Monthly' && !isLoading">
                    <PeakPowerChart chartId="monthlyPowerChart"
                        :past="totalPower?.filter(item => String(item.month) === String(pastMonth))?.map(item => chartObjectBuilder(item.week, item.watt))"
                        :current="totalPower?.filter(item => String(item.month) === String(currentMonth))?.map(item => chartObjectBuilder(item.week, item.watt))"
                        :labels="totalPower?.map(item => item.week)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import { PeakPowerChart, BasicLoading, GraphLoading } from "@/utils/componentLoader.js";
import { today, yesterday, currentWeek, pastWeek, currentMonth, pastMonth } from '@/utils/getTime';
import { chartObjectBuilder } from '@/utils/chartObjectBuilder';

const store = useStore();
const { selectedDate, isLoading } = defineProps(['selectedDate', 'isLoading'])

// Total Power (Chart) -----
const totalPower = computed(() => store?.state.deviceUsage.totalUsages);

// Total Used Power by time range -----
const totalUsedPowerToday = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.date) === String(today))
    ?.find((item, index, array) => { return index === (array.length - 1) }));
const totalUsedPowerCurrentWeek = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.week) === String(currentWeek) ?? 0)
    ?.find((item, index, array) => { return index === (array.length - 1) }));
const totalUsedPowerCurrentMonth = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.month) === String(currentMonth) ?? 0)
    ?.find((item, index, array) => { return index === (array.length - 1) }));

// Total Peak Power by time range -----
const totalPeakPowerToday = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.date) === String(today))
    ?.reduce((prev, current) => (prev.watt > current.watt) ? prev : current, 0) || 0);
const totalPeakPowerCurrentWeek = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.week) === String(currentWeek))
    ?.reduce((prev, current) => (prev.watt > current.watt) ? prev : current, 0) || 0);
const totalPeakPowerCurrentMonth = computed(() => store?.state?.deviceUsage?.totalUsages
    ?.filter(item => String(item.month) === String(currentMonth))
    ?.reduce((prev, current) => (prev.watt > current.watt) ? prev : current, 0) || 0);


// Power Limit -----
const powerLimit = 900 // Soon choosed by user
const powerLimitToday = ref(powerLimit);
const powerLimitWeekly = ref(powerLimit * 7);
const powerLimitMonthly = ref(powerLimit * 30);

const powerPercentageToday = computed(() => Math.round((Number(totalUsedPowerToday?.value.watt) / Number(powerLimitToday.value)) * 100) || 0);
const powerPercentageWeekly = computed(() => Math.round((Number(totalUsedPowerCurrentWeek?.value.watt) / Number(powerLimitWeekly.value)) * 100) || 0);
const powerPercentageMonthly = computed(() => Math.round((Number(totalUsedPowerCurrentMonth?.value.watt) / Number(powerLimitMonthly.value)) * 100) || 0);

</script>