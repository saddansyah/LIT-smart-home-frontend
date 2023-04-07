<template>
    <v-snackbar timeout="2000" color="#0284c7" location="bottom center" v-model="state">
        <v-icon icon="mdi-information text-xl mb-2"></v-icon>
        <p>{{ message }}</p>
        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="$emit('close')">
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>

const { state, message } = defineProps(['state', 'message'])

</script>
