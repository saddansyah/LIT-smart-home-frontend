<template>
    <div class="wrapper flex justify-center">
        <div class="form w-fit z-30 p-9 bg-slate-50 rounded-lg flex flex-col items-center">
            <v-icon class="text-red-500 text-4xl text-center" icon="mdi-alert-outline"></v-icon>
            <h2 class="font-bold text-xl text-center mt-3">Are you sure want to delete?</h2>
            <div class="button flex flex-row space-x-3 w-full  mt-3">
                <button v-ripple @click.prevent="$event => $emit('delete')"
                    class="inline-block w-full px-4 py-2 rounded-lg font-semibold text-white bg-red-400 hover:bg-red-500 shadow-lg">
                    <div v-if="isLoading">
                        <ButtonLoading />
                    </div>
                    <div v-else>
                        Delete
                    </div>
                </button>
                <button v-ripple @click.prevent="$event => $emit('close')"
                    class="inline-block w-full px-4 py-2 rounded-lg font-semibold outline outline-2 outline-slate-300 text-black hover:bg-slate-400 shadow-lg">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ButtonLoading } from '@/utils/componentLoader';

const { isLoading } = defineProps(['isLoading']);

</script>