<template>
  <main class="container p-4 mx-auto mt-32 md:mt-40 lg:mt-32 max-h-fit">
    <h1 class="text-2xl font-bold md:mt-12 lg:mt-0 lg:text-4xl">Hello, {{ username }}</h1>
    <v-dialog v-model="logoutDialog" persistent @keydown.esc="deleteDialog = false">
      <template v-slot:activator="{ props }">
        <button v-ripple v-bind="props"
          class="inline-block mt-6 px-4 py-2 rounded-full font-semibold text-white bg-red-400 hover:bg-sky-500 shadow-lg">
          Log Out <v-icon size="small" icon="mdi-logout"></v-icon>
        </button>
      </template>
      <ModalLogout :username="username" @close="$event => logoutDialog = false" @logout="$event => handleLogout($emit)" />
    </v-dialog>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { ModalLogout } from '@/utils/componentLoader';
import { useStore } from "vuex";

defineProps({
  username: String
});
const emit = defineEmits(['notify'])

const store = useStore();

const logoutDialog = ref(false);

const handleLogout = (emit) => {

  const logout = async () => {
    try {
      await store.dispatch('_logout');
      logoutDialog.value = false
    }
    catch (error) {
      emit('notify', true, false, error);
      console.error(error)
    }
  }

  if (localStorage.getItem('access_token')) {
    logout();
  }
}

</script>
