<template>
    <div class="wrapper flex justify-center">
        <div class="form w-fit z-30 p-9 bg-slate-50 rounded-lg flex flex-col items-center">
            <v-icon class="text-sky-600 text-5xl text-center" icon="mdi-calculator"></v-icon>
            <h2 class="font-bold text-xl text-center mt-3">Welcome to Usage Calculator</h2>
            <p class="mt-4">By choosing your house's watt (in VA or volt-ampere),</p>
            <p>you can estimate the electricity cost for one month</p>
            <h2 class="mt-4 text-xl">Your Usage: <span class="font-bold text-sky-600">{{ totalUsagesCurrentMonth }}</span>
                kWH</h2>
            <button v-ripple
                class="mt-4 inline-block px-3 py-1 text-lg rounded-lg font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-lg">
                {{ selectedKwhList.title }}
                <v-menu activator="parent" location="bottom end">
                    <v-list>
                        <v-list-item v-for="(item, index) in kwhList" @click="selectKwhList(item)" :key="index"
                            :title="item.title" v-model="selectedKwhList">
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-icon icon="mdi-menu-down"></v-icon>
            </button>
            <div class="result mt-4 text-4xl text-sky-600 font-bold">
                {{ currencyFormatter(result) }}
            </div>
            <div class="button flex flex-row justify-end space-x-3 w-full mt-3">
                <button v-ripple @click.prevent="$event => $emit('close')"
                    class="inline-block w-fit px-4 py-2 rounded-lg font-semibold outline outline-2 outline-slate-300 text-black hover:bg-slate-400 shadow-lg">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, watch } from 'vue';
import currencyFormatter from '@/utils/currencyFormatter';

const { totalUsagesCurrentMonth } = defineProps(['totalUsagesCurrentMonth']);

const result = ref(0);

const kwhList = [
    {
        title: '450 VA (Bersubsidi)',
        value: 415
    },
    {
        title: '900 VA (Bersubsidi)',
        value: 605
    },
    {
        title: '900 VA (Rumah Tangga Mampu)',
        value: 1352
    },
    {
        title: '1.300 - 2.200 VA',
        value: 1444.70
    },
    {
        title: '>3.500 VA',
        value: 1699.53
    }
]

const selectedKwhList = ref(kwhList[0]);

const selectKwhList = (item) => {
    selectedKwhList.value = item
}

watch(selectedKwhList, () => {
    result.value = parseFloat(totalUsagesCurrentMonth) * parseFloat(selectedKwhList.value.value)
})

</script>
