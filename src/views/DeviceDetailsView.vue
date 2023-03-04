<template>
    <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32">
        <div class="content-top mb-9 flex flex-row justify-between">
            <div class="content-top-left">
                <h2 class="text-3xl font-bold md:mt-12 lg:mt-0 lg:text-4xl text-sky-600 mb-3">Lampu1</h2>
                <v-chip size="large" color="green" class="font-semibold">lamp</v-chip>
            </div>
            <button class="self-start h-fit px-6 py-2 rounded-full font-semibold text-white bg-sky-600 shadow-lg">Turn
                On<v-icon icon="mdi-power"></v-icon></button>
        </div>
        <div class="main-content flex flex-row w-full gap-20">
            <div class="side-content flex flex-col">
                <div class="p-4 self-center">
                    <v-icon icon="mdi-ceiling-light" class="text-9xl scale-125 text-sky-800"></v-icon>
                </div>
                <div class="specification">
                    <h3 class="text-xl font-bold">Specification</h3>
                    <p>Name: Lampu1</p>
                    <p>Type: Panasonic 12W LED</p>
                    <p>Watt: 12W</p>
                    <p>Voltage: 5.9 V</p>
                    <p>Ampere: 1.9 A</p>
                </div>
            </div>
            <div class="main-container w-full h-fit rounded-xl">
                <div class="grid lg:grid-rows-2 lg:grid-cols-6 gap-6 h-fit">
                    <div
                        class="flex flex-col gap-8 md:col-span-2 h-fit lg:row-span-2 lg:col-span-2 lg:row-start-1 p-6 bg-neutral-50 rounded-xl shadow hover:bg-gray-200">
                        <div class="content-top flex flex-row items-center gap-2">
                            <h3 class="font-bold text-xl lg:text-2xl inline-block">Daily Usage</h3>
                            <v-icon icon="mdi-menu-down" />
                        </div>
                        <div class="main-content flex flex-row gap-4 items-center">
                            <div class="text-6xl lg:text-8xl">⚡</div>
                            <div>
                                <h3 class="text-6xl lg:text-8xl font-bold">12</h3>
                                <h1 class="text-xl lg:text-2xl text-gray-400">kilowatt-hour (kWh)</h1>
                            </div>
                        </div>
                        <div class="daily-goal">
                            <h3 class="font-bold text-xl inline-block">Average Daily Usage:</h3>
                            <h4 class="text-lg"><span class="font-bold text-2xl">12</span> kWH</h4>
                        </div>
                    </div>
                    <!-- Card 2 -->
                    <div
                        class="flex flex-col gap-6 md:col-span-1 lg:col-span-2 lg:row-start-3 p-6 bg-neutral-50 rounded-xl shadow hover:bg-gray-200">
                        <div class="content-top flex flex-row justify-between gap-8">
                            <h3 class="font-bold text-xl inline-block">Device Peak Power</h3>
                            <a href="/"><v-icon icon="mdi-information-outline" class="text-gray-400"/></a> 
                        </div>
                        <div class="main-content flex flex-row justify-between items-center">
                            <div class="main-content-left flex flex-col">
                                <h3 class="text-2xl lg:text-6xl font-bold">24</h3>
                                <h1 class="text-xl self-start text-gray-400">Watt</h1>
                            </div>
                            <div class="main-content-right text-xl flex flex-col items-center text-gray-400">
                                <div class="voltage flex gap-2">
                                    <v-icon icon="mdi-flash-triangle"></v-icon>
                                    <h4>12.1 V</h4>
                                </div>
                                <div class="ampere flex gap-2">
                                    <v-icon icon="mdi-current-dc"></v-icon>
                                    <h4>2.1 A</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Card 3 -->
                    <div
                        class="inline-block row-span-3 md:col-span-3 lg:row-span-3 lg:col-span-4 p-6 bg-neutral-50 rounded-xl shadow hover:bg-gray-200">
                        <div class="content-top flex flex-row justify-between">
                            <div class="content-top-left items-center gap-2">
                                <h3 class="font-bold text-xl lg:text-2xl inline-block">Daily Energy Consumption</h3>
                            </div>
                        </div>
                        <div class="main-content graph">
                            <!-- graph here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>

import { useRoute } from "vue-router";

defineProps({
    device: Object
})

</script>