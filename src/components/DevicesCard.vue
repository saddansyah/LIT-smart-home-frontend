<template>
    <RouterLink :to="{ name: 'Device Details', params: { deviceId: device.id } }">
        <div v-ripple
            :class="'inline-block h-48 w-96 min-w-fit p-4 mr-5 mb-5 transition-all rounded-xl shadow bg-neutral-50 hover:bg-slate-200'">
            <div class="flex flex-row gap-6 h-full">
                <div class="icon self-center">
                    <button><v-icon :icon="device.icon_url" class="text-8xl text-sky-800"></v-icon></button>
                </div>
                <div class="content-center flex flex-col justify-between">
                    <div class="content-center-top">
                        <h3 class="font-bold text-2xl mb-1">{{ device.device_name.length > 12 ? device.device_name.substr(0,
                            12)
                            + '...' : device.device_name }}</h3>
                        <v-chip size="small" color="green" class="font-semibold">{{ device.category }}</v-chip>
                        <div class="device-state inline-block">
                            <div v-if="device.state">
                                <v-chip size="small" prepend-icon="mdi-power" color="blue"
                                    class="ml-3 font-semibold animate-state-pulse">ON</v-chip>
                            </div>
                        </div>
                        <h4 class="text-base mt-1 text-gray-500">Device Power <span class="text-black">{{ device.watt }} W</span></h4>
                    </div>
                    <div class="content-center-bottom">
                        <h4>Today usage: <span class="font-semibold text-lg">{{ device.last_kwh }} kWH</span></h4>
                    </div>
                </div>
                <div class="content-right flex flex-col justify-start">
                    <div class="content-right-top text-gray-500">
                        <button @click.stop.prevent="updateDeviceFavorite($emit)" class="mr-2 text-yellow-500">
                            <div v-if="device.is_favorite">
                                <v-icon icon="mdi-star" size="large"></v-icon>
                            </div>
                            <div v-else>
                                <v-icon icon="mdi-star-outline" size="large"></v-icon>
                            </div>
                        </button>
                        <v-dialog v-model="deleteDialog" persistent @keydown.esc="deleteDialog = false">
                            <template v-slot:activator="{ props }">
                                <button v-bind="props" @click.prevent="">
                                    <v-icon icon="mdi-delete" size="large"></v-icon></button>
                            </template>
                            <ModalDelete @close="$event => deleteDialog = false"
                                @delete="$event => handleDeleteDevice($emit)" />
                        </v-dialog>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>

import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useStore } from "vuex";
import { ModalDelete, NotifySnackbar } from "@/utils/componentLoader";

const props = defineProps({
    device: Object
});
const store = useStore();

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const deviceId = props.device.id;
const deleteDialog = ref(false);

const handleDeleteDevice = async (emit) => {
    try {
        emit('notify', true, true, `${props.device.device_name} is deleted`);
        await store.dispatch('_deleteDataDevice', deviceId);
    }
    catch (error) {
        emit('notify', true, false, error);
    }
}

const updateDeviceFavorite = async (emit) => {
    const url = `${BASE_URL}/user_devices/update_favorite/${deviceId}`
    const body = { is_favorite: !props.device.is_favorite };

    try {
        const data = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const json = await data.json();
        if (json.is_favorite) {
            emit('notify', true, true, `${props.device.device_name} is your favorite(s)`);
        }
        else {
            emit('notify', true, true, `${props.device.device_name} is removed from your favorite(s)`);
        }
        store.commit('_assign_updated_device', json);
    }
    catch (error) {
        emit('notify', true, false, error);
    }
};

</script>
