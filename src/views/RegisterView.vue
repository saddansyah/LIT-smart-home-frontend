<template>
    <div v-if="notify.success">
        <NotifySnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
    </div>
    <div v-else>
        <WarningSnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
    </div>
    <div>
        <h1 class="font-bold text-4xl">Register</h1>
        <div class="login-form w-[40vw] h-fit mx-auto">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="username" :readonly="isLoading" :rules="[rules.required]" class="mb-2" clearable
                    prepend-inner-icon="mdi-account" label="Username">
                </v-text-field>

                <v-text-field v-model="email" :readonly="isLoading" :rules="[rules.required, rules.emailOnly]" class="mb-2"
                    clearable prepend-inner-icon="mdi-at" label="Email">
                </v-text-field>

                <v-text-field v-model="password" :readonly="isLoading"
                    :rules="[rules.required, rules.upperCaseRequired, rules.lowerCaseRequired, rules.digitsRequired, rules.minLength]"
                    :type="showPassword ? 'text' : 'password'" clearable prepend-inner-icon="mdi-lock" label="Password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" placeholder="Enter your password"
                    @click:append="showPassword = !showPassword">
                </v-text-field>

                <v-text-field v-model="confirmPassword" :readonly="isLoading" :rules="[rules.confirmPassword]"
                    :type="showConfirmPassword ? 'text' : 'password'" clearable prepend-inner-icon="mdi-lock"
                    label="Confirm Password" :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    placeholder="Enter your password once more" @click:append="showConfirmPassword = !showConfirmPassword">
                </v-text-field>

                <br>

                <v-btn v-ripple :disabled="!form" :isLoading="isLoading" block color="#0ea5e9" size="large" type="submit"
                    class="text-white mt-6" variant="elevated">
                    <div v-if="isLoading">
                        <ButtonLoading />
                    </div>
                    <div v-else>
                        Register
                    </div>
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { NotifySnackbar, WarningSnackbar, ButtonLoading } from "@/utils/componentLoader";

const store = useStore();
const router = useRouter();
const emit = defineEmits('notify');

const isAuth = computed(() => store.getters?.isAuth);

if (isAuth.value) {
    router.replace({ name: 'Main Dashboard' });
}

const isLoading = ref(false);
const form = ref(false);
const username = ref('');
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


const onSubmit = () => {
    if (!form.value) return

    isLoading.value = true;
    form.value = false;

    const body = {
        name: username.value,
        email: email.value,
        password: password.value
    }

    const register = async () => {
        try {
            const register = await store.dispatch('_register', body);
            emitNotify(true, true, register.message);
            router.replace({ name: "Login" });
            isLoading.value = false
            form.value = true;
        }
        catch (error) {
            emitNotify(true, false, error);
            isLoading.value = false
            form.value = true;
        }
    }
    register();
}

// Snackbars
const notify = ref({
    state: false,
    success: false,
    message: ''
});

const emitNotify = (state, success, message) => {
    notify.value.state = state;
    notify.value.success = success;
    notify.value.message = message;
}


</script>