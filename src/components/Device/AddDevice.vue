<template>
    <div class="wrapper flex justify-center">
        <div class="form w-72 lg:w-[90vh] z-30 p-9 bg-slate-50 rounded-lg">
            <v-form v-model="form">
                <div class="content-top flex flex-row justify-between">
                    <h1 class="font-bold text-xl lg:text-2xl mb-9">Add New Device</h1>
                    <button @click="$emit('close')" class="h-fit"><v-icon icon="mdi-close"></v-icon></button>
                </div>
                <v-text-field required v-model="deviceName" :rules="[rules.required]" label="Device Name" clearable
                    placeholder="Example: LIT-Smart-Lamp3"></v-text-field>
                <v-combobox required v-model="deviceCategory" :rules="[rules.required]"
                    :items="deviceCategoryList.map(item => item.title)" label="Device Category" chips
                    clearable></v-combobox>
                <v-text-field required v-model.number="deviceVoltage" :rules="[rules.required, rules.numberOnly]"
                    label="Device Voltage (V)" clearable placeholder="Example: 6"></v-text-field>
                <v-text-field required v-model.number="deviceCurrent" :rules="[rules.required, rules.numberOnly]"
                    label="Device Current (A)" clearable placeholder="Example: 2"></v-text-field>
                <v-text-field required v-model.number="devicePower" :rules="[rules.required, rules.numberOnly]"
                    label="Device Power (W)" clearable placeholder="Example: 12"></v-text-field>
                <v-btn type="button" @click.prevent="$event => handleAddDevice($emit)" v-ripple :disabled="!form" size="x-large"
                    class="w-full rounded font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg disabled:bg-slate-300">Add <v-icon icon="mdi-plus"></v-icon></v-btn>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

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

const handleAddDevice = (emit) => {
    const newDevice = {
        user_id: '1',
        device_name: deviceName.value,
        category: deviceCategory.value,
        volt: deviceVoltage.value,
        ampere: deviceCurrent.value,
        watt: devicePower.value,
        icon_url: deviceCategoryList.value.find(item => item.title === deviceCategory.value)?.icon_url || 'mdi-devices'
    }

    console.log(newDevice)

    const storeDataDevice = async () => {
        try {
            await store.dispatch('_storeDataDevice', newDevice);
            emit('close');
        }
        catch (error) {
            alert(error);
        }
    }

    storeDataDevice();

}

// Add New Device
const form = ref(false);
const rules = ref(
    {
        numberOnly: value => {
            const pattern = /^[0-9]+$/
            return pattern.test(value) || 'Number only (0-9).';

        },
        required: value => !!value || 'Required.'
    }
)
const deviceName = ref('');
const deviceCategory = ref('')
const deviceVoltage = ref('');
const deviceCurrent = ref('');
const devicePower = ref('');
</script>

