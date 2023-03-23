<template>
  <div @click.prevent="$event => updateDeviceState()" v-ripple
    :class="'button inline-block max-w-sm h-20 w-48 lg:h-24 lg:w-64 px-4 mr-5  rounded-xl shadow transition-all ' + ' ' + (props.device.state ? 'bg-sky-600 hover:bg-sky-700 text-white animate-pulse ' : 'bg-slate-50 hover:bg-gray-200')">
    <div class="flex flex-row h-full w-full items-center justify-between">
      <div class="content-left flex flex-row items-center gap-4">
        <!-- <img src="#" alt="icon"> -->
        <v-icon :icon="device.icon_url" size="x-large"
          :class="(props.device.state ? 'text-yellow-200' : ' text-sky-800')"></v-icon>
        <div class="text-content flex flex-col justify-center">
          <h2 class="font-semibold lg:text-xl">{{ props.device.device_name.length > 12? props.device.device_name.substr(0, 12) + '...' : props.device.device_name}}</h2>
          <div v-if="device.state">
            <h4 class="font-light text-sm lg:text-base">State: ON</h4>
          </div>
          <div v-else>
            <h4 class="font-light text-sm lg:text-base">State: OFF</h4>
          </div>
        </div>
      </div>
      <RouterLink :to="{name: 'Device Details', params: { deviceId } }" class="appearance-none"><v-icon icon="mdi-information-outline" class="text-gray-400"></v-icon></RouterLink>
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

const backendUrl = 'http://127.0.0.1:8000/api/devices/';
const deviceId = props.device.id;

const updateDeviceState = async () => {
    const url = backendUrl + 'update_state/';
    const body = { state: !props.device.state };

    try {
        const data = await fetch(url + deviceId, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const json = await data.json();
        store.commit('_assign_updated_device', json);
    }
    catch (error) {
        alert(error);
        console.error(error);
    }
};

</script>
