<template>
    <v-snackbar timeout="4000" color="#0284c7" location="bottom right" v-model="notify.state">
        {{ notify.message }}
        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="$emit('close')">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>

const notify = defineProps({
    state: Boolean,
    message: String
})

</script>
