<template>
    <div>
        <h1 class="font-bold text-4xl">Login</h1>
        <div class="login-form w-96 h-fit mx-auto">
            <v-form v-model="form" @submit.prevent="onSubmit">
    
                <v-text-field 
                    v-model="email" 
                    :readonly="loading" 
                    :rules="[required]" 
                    class="mb-2" 
                    clearable
                    prepend-inner-icon="mdi-at"
                    label="Email">
                </v-text-field>
    
                <v-text-field 
                    v-model="password" 
                    :readonly="loading" 
                    :rules="[required]"
                    :type="showPassword ? 'text' : 'password'" 
                    clearable
                    prepend-inner-icon="mdi-lock"
                    label="Password" 
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    placeholder="Enter your password"
                    @click:append="showPassword = !showPassword">
                </v-text-field>
    
                <v-text-field 
                    v-model="confirmPassword" 
                    :readonly="loading" 
                    :rules="[required]"
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    clearable
                    prepend-inner-icon="mdi-lock"
                    label="Confirm Password" 
                    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    placeholder="Enter your password once more"
                    @click:append="showConfirmPassword = !showConfirmPassword">
                </v-text-field>
    
                <br>
    
                <v-btn 
                    :disabled="!form" 
                    :loading="loading" 
                    block 
                    color="#0ea5e9"
                    size="large" 
                    type="submit"
                    variant="elevated">
                        Sign In
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref(false);

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const confirmPassword = ref('');
const showConfirmPassword = ref(false);

const loading = ref(false);

const onSubmit = () => {
    if (!this.form) return

    this.loading = true

    setTimeout(() => (this.loading = false), 2000)
}

const rules = ref({
})


</script>