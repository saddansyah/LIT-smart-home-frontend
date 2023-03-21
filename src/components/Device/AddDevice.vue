<template>
    <div class="wrapper flex justify-center">
        <div class="form w-72 lg:w-[90vh] z-30 p-9 bg-slate-50 rounded-lg">
            <form @submit.prevent="$event => handleAdd($emit)">
                <div class="content-top flex flex-row justify-between">
                    <h1 class="font-bold text-xl lg:text-2xl mb-9">Add New Device</h1>
                    <button @click="$emit('close')" class="h-fit"><v-icon icon="mdi-close"></v-icon></button>
                </div>
                <v-text-field required v-model="deviceName" :rules="rules" label="Device Name" clearable
                    placeholder="Example: LIT-Smart-Lamp3"></v-text-field>
                <v-combobox required v-model="deviceCategory" :rules="rules"
                    :items="deviceCategoryList.map(item => item.title)" label="Device Category" chips
                    clearable></v-combobox>
                <v-text-field required v-model.number="deviceVoltage" :rules="rules" label="Device Voltage (V)" clearable
                    placeholder="Example: 6"></v-text-field>
                <v-text-field required v-model.number="deviceCurrent" :rules="rules" label="Device Current (A)" clearable
                    placeholder="Example: 2"></v-text-field>
                <v-text-field required v-model.number="devicePower" :rules="rules" label="Device Power (W)" clearable
                    placeholder="Example: 12"></v-text-field>
                <button type="submit" v-ripple
                    class="inline-block w-full mt-6 p-4 rounded font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg">Add</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

defineProps({
    deviceCategoryList: Array
})

const store = useStore()
const router = useRouter()


const handleAdd = (emit) => {
    const newDevice = {
        user_id: '1',
        device_name: deviceName.value,
        category: deviceCategory.value,
        volt: deviceVoltage.value,
        ampere: deviceCurrent.value,
        watt: devicePower.value,
        icon_url: 'mdi-devices'
    }

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
const rules = [value => { if (value) return true; return 'This field is required' }]
const deviceName = ref('');
// const deviceCategory = ref(deviceCategoryList);
const deviceCategory = ref([])
const deviceVoltage = ref('');
const deviceCurrent = ref('');
const devicePower = ref('');
</script>

