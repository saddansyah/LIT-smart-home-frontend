<template>
    <div class="wrapper flex justify-center">
        <div class="form w-72 lg:w-[90vh] z-30 p-9 bg-slate-50 rounded-lg">
            <v-form v-model="form" @submit.prevent="$event => handleUpdateDevice($emit)">
                <div class="content-top flex flex-row justify-between">
                    <h1 class="font-bold text-xl lg:text-2xl mb-9">Edit Device {{ props.device.device_name }}</h1>
                    <button @click.prevent="$emit('close')" class="h-fit"><v-icon icon="mdi-close"></v-icon></button>
                </div>
                <v-text-field required v-model="deviceName" :rules="[rules.required]" label="Device Name"
                    clearable placeholder="Example: LIT-Smart-Lamp3"></v-text-field>
                <v-combobox required v-model="deviceCategory" :rules="[rules.required]"
                    :items="deviceCategoryList.map(item => item.title)" label="Device Category" chips
                    clearable></v-combobox>
                <v-text-field  required v-model="deviceVoltage" :rules="[rules.required, rules.numberOnly]"
                    label="Device Voltage (V)" clearable placeholder="Example: 6"></v-text-field>
                <v-text-field  required v-model="deviceCurrent" :rules="[rules.required, rules.numberOnly]"
                    label="Device Current (A)" clearable placeholder="Example: 2"></v-text-field>
                <v-text-field required v-model="devicePower" :rules="[rules.required, rules.numberOnly]"
                    label="Device Power (W)" clearable placeholder="Example: 12"></v-text-field>
                <v-btn type="submit" v-ripple size="x-large"
                    class="w-full rounded font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg disabled:bg-slate-300">Edit
                    <v-icon icon="mdi-pencil"></v-icon></v-btn>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
    device: Object
})

const store = useStore();
const deviceCategoryList = ref([
    { title: 'Light Bulb', icon_url: 'mdi-lightbulb' },
    { title: 'Led Strip', icon_url: 'mdi-led-strip' },
    { title: 'Wall Light', icon_url: 'mdi-wall-sconce-flat' },
    { title: 'Wall Socket', icon_url: 'mdi-power-socket-eu' },
    { title: 'Wall Switch', icon_url: 'mdi-electric-switch' },
    { title: 'Extension Power (Roll)', icon_url: 'mdi-power-plug' },
    { title: 'Portable Plug', icon_url: 'mdi-power-plug' }
]);
const pattern = /^[+]?\d+(\.\d+)?$/;

const handleUpdateDevice = (emit) => {
    if( !deviceName.value || !deviceCategory.value || !deviceVoltage.value || !deviceCurrent.value || !devicePower.value ){
        alert('Text field cant be empty.');
        return;
    }

    if (!pattern.test(deviceVoltage.value) || !pattern.test(deviceCurrent.value) || !pattern.test(devicePower.value)){
        alert('Voltage, Current, and Power must be numeric (0-9) only.');
        return;
    }

    const newDevice = {
        data: {
            user_id: '1',
            device_name: deviceName.value,
            category: deviceCategory.value,
            volt: deviceVoltage.value,
            ampere: deviceCurrent.value,
            watt: devicePower.value,
            icon_url: deviceCategoryList.value.find(item => item.title === deviceCategory.value)?.icon_url || 'mdi-devices'
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
const deviceCategory = ref(props.device?.category);
const deviceVoltage = ref(props.device?.volt);
const deviceCurrent = ref(props.device?.ampere);
const devicePower = ref(props.device?.watt);
</script>