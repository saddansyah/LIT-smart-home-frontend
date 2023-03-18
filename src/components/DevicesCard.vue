<template>
    <div v-ripple
        class="inline-block h-48 w-96 min-w-fit p-4 mr-5 mb-5 bg-neutral-50 rounded-xl shadow hover:bg-slate-200 transition-all">
        <div class="flex flex-row gap-6 h-full">
            <div class="icon self-center">
                <button><v-icon :icon="device.icon_url" class="text-8xl text-sky-800"></v-icon></button>
            </div>
            <div class="content-center flex flex-col justify-between">
                <div class="content-center-top">
                    <h3 class="font-bold text-2xl mb-1">{{ device.device_name }}</h3>
                    <v-chip size="small" color="green" class="font-semibold">{{ device.category }}</v-chip>
                    <div class="device-state inline-block">
                        <div v-if="device.state">
                            <v-chip size="small" prepend-icon="mdi-power" color="blue" class="ml-3 font-semibold">ON</v-chip>
                        </div>
                    </div>
                    <h4 class="text-base mt-1">{{ device.watt }} W</h4>
                </div>
                <div class="content-center-bottom">
                    <h4>Today usage: <span class="font-semibold text-lg">{{ device.watt }} kWH</span></h4>
                    <RouterLink :to="{ name: 'Device Details', params: { deviceId: device.id } }">
                        <h4 class="text-base underline text-gray-400">Tap to view details</h4>
                    </RouterLink>

                </div>
            </div>
            <div class="content-right flex flex-col justify-start">
                <div class="content-right-top text-gray-500">
                    <button class="mr-2 text-yellow-500">
                        <div v-if="device.is_favorite">
                            <v-icon icon="mdi-star" size="large"></v-icon>
                        </div>
                        <div v-else>
                            <v-icon icon="mdi-star-outline" size="large"></v-icon>
                        </div>
                    </button>
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
