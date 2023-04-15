<template>
  <div class="bg-slate-100 relative z-20 shadow">
    <div class="container mx-auto h-fit">
      <v-breadcrumbs :items="breadcrumbs" class="py-2">
        <template #divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const _route = useRoute();
const store = useStore();

const route = {
  name: computed(() => _route.name || ''),
  path: computed(() => _route.path || ''),
  deviceParams: computed(() => Number(_route.params.deviceId) || '')
}
const device = computed(() => store?.state?.device?.devices.find(device => device.id === route.deviceParams.value) || '');

// const breadcrumbs = ref(["Home", ""]);
const breadcrumbs = ref([
  {
    title: 'Home',
    href: '/'
  },
  {
    title: '',
    href: ''
  }]
);

watchEffect(() => {
  const newBreadcrumbItems = [{ title: device.value.device_name || route.name.value, disabled: false, to: route.path.value }];

  route.deviceParams.value && newBreadcrumbItems.unshift({ title: 'Devices', disabled: false, to: '/devices' }); // if device params exist, insert parent route

  breadcrumbs.value = [{
    title: 'Home',
    href: '/'
  }, ...newBreadcrumbItems];

});

</script>
