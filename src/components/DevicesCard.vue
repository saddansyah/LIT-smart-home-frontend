<template>
    <div class="inline-block h-48 w-96 min-w-fit p-4 mr-5 mb-5 bg-neutral-50 rounded-xl shadow hover:bg-gray-200">
        <div class="flex flex-row gap-6 h-full">
            <div class="icon self-center">
                <button><v-icon icon="mdi-ceiling-light" class="text-8xl text-sky-800"></v-icon></button>
            </div>
            <div class="content-center flex flex-col justify-between">
                <div class="content-center-top">
                    <h3 class="font-bold text-2xl mb-1">{{ device.id }}</h3>
                    <v-chip size="small" color="green" class="font-semibold">{{ device.category }}</v-chip>
                    <h4 class="text-base mt-1">{{ device.power }} W</h4>
                </div>
                <div class="content-center-bottom">
                    <h4>Today usage: <span class="font-semibold text-lg">{{ device.dailyUsage }} kWH</span></h4>
                    <a href="/">
                        <RouterLink :to="{name: 'Device Details', params: {deviceId: device.id}}"><h4 class="text-base underline text-gray-400">Tap to view details</h4></RouterLink>
                    </a>
                </div>
            </div>
            <div class="content-right flex flex-col justify-start">
                <div class="content-right-top text-gray-500">
                    <button class="mr-2 text-yellow-500"><v-icon icon="mdi-star-outline" size="large"></v-icon></button>
                    <button><v-icon icon="mdi-delete" size="large"></v-icon></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { RouterLink } from "vue-router";

defineProps({
    device: Object
})

</script>
