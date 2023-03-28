<template>
    <div>
        <h1 class="font-bold text-4xl">Login</h1>
        <div class="login-form w-96 h-fit mx-auto">
            <v-form v-model="form" @submit.prevent="onSubmit">
    
                <v-text-field 
                    v-model="email" 
                    :readonly="loading" 
                    :rules="[rules.required, rules.emailOnly]" 
                    class="mb-2" 
                    clearable
                    prepend-inner-icon="mdi-at"
                    label="Email">
                </v-text-field>
    
                <v-text-field 
                    v-model="password" 
                    :readonly="loading" 
                    :rules="[rules.required, rules.upperCaseRequired, rules.lowerCaseRequired, rules.digitsRequired, rules.minLength]"
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
                    :rules="[rules.confirmPassword]"
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
                    v-ripple
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

const rules = ref(
    {
        emailOnly: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Your email is not in correct format',
        upperCaseRequired: value => /(?=.*?[A-Z])/.test(value) || 'At least one uppercase.',
        lowerCaseRequired: value => /(?=.*?[a-z])/.test(value) || 'At least one lowercase.',
        digitsRequired: value => /(?=.*?[0-9])/.test(value) || 'At least one digit.',
        minLength: value => /.{8,}/.test(value) || 'At least have 8 characters.',
        required: value => !!value || 'Required.',
        confirmPassword: value => value === password.value || 'Your confirm password is not matched'
    }
)

const loading = ref(false);
const onSubmit = () => {
    if (!this.form) return
}



</script>