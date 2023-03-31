<template>
    <div class="wrapper flex justify-center">
        <div class="form w-72 lg:w-[90vh] z-30 p-9 bg-slate-50 rounded-lg">
            <v-form v-model="form" @submit.prevent="$event => handleUpdateDevice($emit)">
                <div class="content-top flex flex-row justify-between">
                    <h1 class="font-bold text-xl lg:text-2xl mb-9">Edit Device {{ props.device.device_name }}</h1>
                    <button @click.prevent="$emit('close')" class="h-fit"><v-icon icon="mdi-close"></v-icon></button>
                </div>
                <v-text-field required v-model="deviceName" :rules="[rules.required]" label="Device Name" clearable
                    placeholder="Example: LIT-Smart-Lamp3"></v-text-field>
                <v-btn type="submit" v-ripple size="x-large"
                    class="w-full rounded font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg disabled:bg-slate-300">Edit
                    <v-icon icon="mdi-pencil"></v-icon></v-btn>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
    device: Object
})

const getProductDevice = async () => {
    try {
        await store.dispatch('_getProductDevice')
    }
    catch (error) {
        alert(error);
        console.error(error);
    }
}
getProductDevice();

const pattern = /^[+]?\d+(\.\d+)?$/;

const handleUpdateDevice = (emit) => {
    if (!deviceName.value) {
        alert('Text field cant be empty.');
        return;
    }

    // if (!pattern.test(deviceVoltage.value) || !pattern.test(deviceCurrent.value) || !pattern.test(devicePower.value)){
    //     alert('Voltage, Current, and Power must be numeric (0-9) only.');
    //     return;
    // }

    const newDevice = {
        data: {
            device_name: deviceName.value
        },
        deviceId
    }

    const updateDataDevice = async () => {
        try {
            await store.dispatch('_updateDataDevice', newDevice);
            emit('notify', true, `${deviceName.value} is edited`);
            emit('close');
        }
        catch (error) {
            emit('notify', true, `${error}`);
            alert(error);
        }
    }

    updateDataDevice();

}

// Edit this device
const form = ref(true);
const rules = ref(
    {
        numberOnly: value => {
            return pattern.test(value) || 'Float only (0-9).';

        },
        required: value => !!value || 'Required.'
    }
)
const deviceId = ref(props.device?.id);
const deviceName = ref(props.device?.device_name);
</script>