<template>
    <div class="wrapper flex justify-center">
        <div class="form w-72 lg:w-[90vh] z-30 p-9 bg-slate-50 rounded-lg">
            <v-form v-model="form" @submit.prevent="$event => handleUpdateDevice()">
                <div class="content-top flex flex-row justify-between">
                    <h1 class="font-bold text-xl lg:text-2xl mb-9">Edit Device {{ props.device.device_name }}</h1>
                    <button @click.prevent="$emit('close')" class="h-fit"><v-icon icon="mdi-close"></v-icon></button>
                </div>
                <v-text-field required v-model="deviceName" :rules="[rules.required]" label="Device Name" clearable
                    placeholder="Example: LIT-Smart-Lamp3"></v-text-field>
                <v-btn type="submit" v-ripple size="x-large" :disabled="!form"
                    class="w-full rounded font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg disabled:bg-slate-300">
                    <div v-if="isLoading">
                        <ButtonLoading />
                    </div>
                    <div v-else>
                        Edit <v-icon icon="mdi-pencil"></v-icon>
                    </div>
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ButtonLoading } from "@/utils/componentLoader";

const store = useStore();
const route = useRoute();
const props = defineProps({
    device: Object
})
const emit = defineEmits(['notify', 'close'])

const getProductDevice = async () => {
    try {
        await store.dispatch('_getProductDevice')
    }
    catch (error) {
        emitNotify(true, false, `${error}`);
        console.error(error);
    }
}
getProductDevice();

const handleUpdateDevice = () => {
    isLoading.value = true;
    form.value = false;

    if (!deviceName.value) {
        emitNotify(true, false, `Text field cant be empty`);
        return;
    }

    const body = { device_name: deviceName.value }
    const updateDataDevice = async () => {
        try {
            await store.dispatch('_updateDataDevice', { body, deviceId });
            emitNotify(true, true, `${deviceName.value} is edited`);
            isLoading.value = false;
            form.value = true;
            emit('close');
        }
        catch (error) {
            emitNotify(true, false, `${error}`);
            isLoading.value = false;
            form.value = true;
        }
    }

    updateDataDevice();

}

// Edit this device
const form = ref(true);
const isLoading = ref(false);
const rules = ref(
    {
        required: value => !!value || 'Required.'
    }
)
const deviceId = route.params.deviceId;
const deviceName = ref(props.device?.device_name);

// Snackbar
const emitNotify = (state, success, message) => {
    emit('notify', state, success, message)
}
</script>