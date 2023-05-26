<template>
    <RouterLink :to="{ name: 'Device Details', params: { deviceId: device.id } }">
        <div v-ripple
            :class="'inline-block h-fit w-full md:w-96 min-w-fit p-4 mr-5 mb-5 transition-all rounded-xl shadow bg-neutral-50 hover:bg-slate-200'">
            <div class="flex flex-row gap-6 h-full">
                <div class="icon self-center">
                    <button><v-icon :icon="device.icon_url" class="text-6xl md:text-8xl text-sky-800"></v-icon></button>
                </div>
                <div class="content-center flex flex-col justify-between">
                    <div class="content-center-top">
                        <h3 class="font-bold text-2xl mb-1">{{ device.device_name.length > 12 ? device.device_name.substr(0,
                            12)
                            + '...' : device.device_name }}</h3>
                        <div class="chip flex flex-row gap-2">
                            <v-chip size="small" color="green" class="font-semibold">{{ device.category }}</v-chip>
                            <div class="device-state inline-block">
                                <div v-if="device.state">
                                    <v-chip size="small" prepend-icon="mdi-power" color="blue"
                                        class=" font-semibold animate-state-pulse">ON</v-chip>
                                </div>
                            </div>
                        </div>
                        <h4 class="text-base mt-1 text-gray-500">Device Power <span class="text-black">{{ device.watt }}
                                W</span></h4>
                    </div>
                    <div class="content-center-bottom mt-6">
                        <h4>Today usage: <span class="font-semibold text-lg">{{ device.last_kwh }} kWH</span></h4>
                    </div>
                </div>
                <div class="content-right flex flex-col justify-start">
                    <div class="content-right-top flex flex-col md:flex-row items-end justify-end gap-4 md:gap-2 text-gray-500">
                        <button @click.stop.prevent="updateDeviceFavorite()" class=" text-yellow-500">
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
                            <ModalDelete @close="$event => deleteDialog = false" @delete="$event => handleDeleteDevice()"
                                :isLoading="isLoading" />
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
const emit = defineEmits(['notify']);
const store = useStore();

const deviceId = props.device.id;
const deleteDialog = ref(false);
const isLoading = ref(false);

const handleDeleteDevice = async () => {
    isLoading.value = true
    try {
        await store.dispatch('_deleteDataDevice', deviceId);
        emitNotify(true, true, `${props.device.device_name} is deleted`);
        isLoading.value = false;
    }
    catch (error) {
        emitNotify(true, false, error);
        isLoading.value = false;
    }
}

const updateDeviceFavorite = async () => {
    const body = { is_favorite: !props.device.is_favorite };
    console.log(body);
    try {
        const device = await store.dispatch('_updateDeviceFavorite', { body, deviceId });
        if (device.is_favorite) {
            emitNotify(true, true, `${props.device.device_name} is your favorite(s)`)
        }
        else {
            emitNotify(true, true, `${props.device.device_name} is removed from your favorite(s)`)
        }
    }
    catch (error) {
        emitNotify(true, false, error);
        console.error(error);
    }
};

// Snackbar
const emitNotify = (state, success, message) => {
    emit('notify', state, success, message)
}

</script>
