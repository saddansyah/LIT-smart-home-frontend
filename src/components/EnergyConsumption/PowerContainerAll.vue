<template>
    <div class="main inline-block w-full">
        <div class="main-top flex w-full h-fit lg:flex-row gap-6">
            <div v-ripple class="energy-usage basis-1/2 flex flex-col w-fit gap-6 rounded-xl shadow bg-slate-50 hover:bg-slate-200 transition-all p-6 ">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Power Usage</h3>
                <div class="energy-usage-main flex gap-2 items-center">
                    <div class="text-6xl lg:text-8xl">⚡</div>
                    <div class="content-right">
                        <h3 class="text-6xl lg:text-8xl font-bold">12</h3>
                        <p class="text-xl text-gray-600">kilo-watt hour (kWH)</p>
                    </div>
                </div>
            </div>
            <div v-ripple class="energy-limit basis-1/2 flex flex-col gap-6 rounded-xl w-fit shadow bg-slate-50 hover:bg-slate-200 transition-all p-6">
                <h3 class="font-bold text-xl lg:text-2xl inline-block">Power Limit</h3>
                <div class="energy-usage-main">
                    <div class="energy-usage-main flex gap-2 items-center">
                        <div class="text-6xl lg:text-8xl">⭕</div>
                        <div class="content-right">
                            <h3 class="text-2xl lg:text-4xl font-bold">12 W</h3>
                            <p class="text-xl text-gray-600">from limit: 900 VA</p>
                            <v-chip size="large" color="green" class="font-semibold">Safe</v-chip>
                            <p class="text-base mt-4 underline text-gray-400">Set your usage limit here</p>
                            <p class="text-base underline text-gray-400">See your electricity cost here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-ripple class="energy-chart mt-6 rounded-xl w-full h-96 shadow bg-slate-50 hover:bg-slate-200 transition-all p-6">
            <h3 class="font-bold text-xl lg:text-2xl inline-block">Power Chart</h3>
            <PeakPowerChart chartId="powerConsumptionChart" />
        </div>
    </div>
</template>

<script setup>
import { PeakPowerChart } from "@/utils/componentLoader.js";

</script>