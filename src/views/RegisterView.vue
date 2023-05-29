<template>
    <div v-if="notify.success">
        <NotifySnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
    </div>
    <div v-else>
        <WarningSnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
    </div>
    <div class="h-screen flex items-center justify-center">
        <section class="register-slate-100 w-full h-fit">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                    <img class="w-8 h-8 mr-2" src="https://lunar-inovasi.co.id/_nuxt/img/logoLIT.d7081bb.svg"
                        alt="logo">
                    Smart Home Dashboard
                </a>
                <div class="w-full bg-slate-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold text-gray-900 md:text-2xl">
                            Register new account
                        </h1>
                        <v-form v-model="form" @submit.prevent="onSubmit">
                            <div>
                                <v-text-field v-model="username" :readonly="isLoading" :rules="[rules.required]"
                                    class="mb-2" clearable prepend-inner-icon="mdi-account" label="Username">
                                </v-text-field>
                            </div>
                            <div>
                                <v-text-field v-model="email" :readonly="isLoading"
                                    :rules="[rules.required, rules.emailOnly]" class="mb-2" clearable
                                    prepend-inner-icon="mdi-at" label="Email">
                                </v-text-field>
                            </div>
                            <div>
                                <v-text-field v-model="password" :readonly="isLoading"
                                    :rules="[rules.required, rules.upperCaseRequired, rules.lowerCaseRequired, rules.digitsRequired, rules.minLength]"
                                    :type="showPassword ? 'text' : 'password'" clearable prepend-inner-icon="mdi-lock"
                                    label="Password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    placeholder="Enter your password" @click:append="showPassword = !showPassword">
                                </v-text-field>
                            </div>
                            <div>
                                <v-text-field v-model="confirmPassword" :readonly="isLoading"
                                    :rules="[rules.confirmPassword]" :type="showConfirmPassword ? 'text' : 'password'"
                                    clearable prepend-inner-icon="mdi-lock" label="Confirm Password"
                                    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    placeholder="Enter your password once more"
                                    @click:append="showConfirmPassword = !showConfirmPassword">
                                </v-text-field>
                            </div>
                            <v-btn v-ripple :disabled="!form" :isLoading="isLoading" block color="#0ea5e9"
                                class="text-white mt-6" size="large" type="submit" variant="elevated">
                                <div v-if="isLoading">
                                    <ButtonLoading />
                                </div>
                                <div v-else>
                                    Register
                                </div>
                            </v-btn>
                            <p class="text-sm font-light text-gray-500 mt-6">
                                Have an account? <RouterLink class="font-medium text-primary-600 hover:underline"
                                    :to="{ name: 'Login' }">Login</RouterLink>
                            </p>
                        </v-form>
                    </div>
                </div>
            </div>
        </section>
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
            form.value = true;
            setTimeout(() => {
                isLoading.value = false
                router.replace({ name: "Login" });
            }, 2000)
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