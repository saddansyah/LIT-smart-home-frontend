<template>
  <div @click.prevent="$event => updateDeviceState()" v-ripple
    :class="'button inline-block max-w-sm h-20 w-52 lg:h-24 lg:w-64 px-4 mr-5 rounded-xl shadow transition-all ' + ' ' + (props.device.state ? 'bg-sky-600 hover:bg-sky-700 text-white animate-pulse ' : 'bg-slate-50 hover:bg-gray-200')">
    <div class="flex flex-row gap-2 h-full w-full items-center justify-between">
      <div class="content-left flex flex-row items-center gap-4">
        <!-- <img src="#" alt="icon"> -->
        <v-icon :icon="device.icon_url" size="x-large"
          :class="(props.device.state ? 'text-yellow-200' : ' text-sky-800')"></v-icon>
        <div class="text-content flex flex-col justify-center">
          <h2 class="font-semibold lg:text-xl">{{ props.device.device_name.length > 12 ?
            props.device.device_name.substr(0,
              12) + '...' : props.device.device_name }}</h2>
          <div v-if="device.state">
            <p class="font-light text-sm lg:text-base">State: ON</p>
          </div>
          <div v-else>
            <p class="font-light text-sm lg:text-base">State: OFF</p>
          </div>
        </div>
      </div>
      <v-tooltip location="top" text="Click to turn on/off the device">
        <template #activator="{ props }">
          <v-icon v-bind="props" icon="mdi-information-outline" class="text-gray-400"></v-icon>
        </template>
      </v-tooltip>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({
  device: Object
});
const store = useStore();
const emit = defineEmits(['notify'])

const deviceId = props.device.id;

const updateDeviceState = async () => {
    const body = { state: !props.device.state };
    try {
        const device = await store.dispatch('_updateDeviceState', {body, deviceId});
        if (device.state) {
            emitNotify(true, true, `${device.device_name} is on`)
        }
        else {
            emitNotify(true, true, `${device.device_name} is off`)
        }
    }
    catch (error) {
        emitNotify(true, false, error);
        console.error(error);
    }
}

// Snackbar
const emitNotify = (state, success, message) => {
    emit('notify', state, success, message)
}

</script>
