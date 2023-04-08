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
                    :items="deviceCategoryList.map(item => item.category)" label="Device Category" chips
                    clearable></v-combobox>
                <v-btn type="button" @click.prevent="$event => handleAddDevice($emit)" v-ripple :disabled="!form" size="x-large"
                    class="w-full rounded font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg disabled:bg-slate-300">Add <v-icon icon="mdi-plus"></v-icon></v-btn>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(['notify', 'close'])

const getProductDevice = async () => {
    try{
        await store.dispatch('_getProductDevice')
    }
    catch(error){
        emitNotify(true, false, error);
        console.error(error);
    }
}
getProductDevice();

const deviceCategoryList = computed(() => store?.state?.device?.productDevices?.map(item => { return { 'id': item.id, 'category': item.category } }));

const handleAddDevice = (emit) => {
    const newDevice = {
        device_name: deviceName.value,
        device_id: deviceCategoryList.value.find(item => item.category === deviceCategory.value)?.id,
    }

    const storeDataDevice = async () => {
        try {
            await store.dispatch('_storeDataDevice', newDevice);
            emitNotify(true, true, `${newDevice.device_name} is added`);
            emit('close');
        }
        catch (error) {
            emitNotify(true, false, error);
            console.error(error);
        }
    }

    storeDataDevice();

}

// Add New Device
const form = ref(false);
const rules = ref(
    {
        numberOnly: value => {
            const pattern = /^[+]?\d+(\.\d+)?$/
            return pattern.test(value) || 'Float only (0-9).';

        },
        required: value => !!value || 'Required.'
    }
)
const deviceName = ref('');
const deviceCategory = ref('')

// Snackbar
const emitNotify = (state, success, message) => {
    emit('notify', state, success, message)
}
</script>

