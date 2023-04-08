<template>
    <div v-if="notify.success">
        <NotifySnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
    </div>
    <div v-else>
        <WarningSnackbar :message="notify.message" :state="notify.state" @close="$event => notify.state = false" />
    </div>
    <section class="login bg-slate-100">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                Smart Home
            </a>
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold text-gray-900 md:text-2xl">
                        Login to your account
                    </h1>
                    <v-form v-model="form" @submit.prevent="onSubmit">
                        <div>
                            <v-text-field v-model="email" :readonly="isLoading" :rules="[rules.required, rules.emailOnly]"
                                class="mb-2" clearable prepend-inner-icon="mdi-at" label="Email">
                            </v-text-field>
                        </div>
                        <div>
                            <v-text-field v-model="password" :readonly="isLoading" :rules="[rules.required]"
                                :type="showPassword ? 'text' : 'password'" clearable prepend-inner-icon="mdi-lock"
                                label="Password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                placeholder="Enter your password" @click:append="showPassword = !showPassword">
                            </v-text-field>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                                        required="">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline">Forgot
                                password?</a>
                        </div>
                        <v-btn v-ripple :disabled="!form" :isLoading="isLoading" block color="#0ea5e9"
                            class="text-white mt-6" size="large" type="submit" variant="elevated">
                            <div v-if="isLoading">
                                <ButtonLoading />
                            </div>
                            <div v-else>
                                Login
                            </div>
                        </v-btn>

                        <p class="text-sm font-light text-gray-500 mt-6">
                            Don’t have an account yet? <RouterLink class="font-medium text-primary-600 hover:underline"
                                :to="{ name: 'Register' }">Register</RouterLink>
                        </p>
                    </v-form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useStore } from "vuex";
import { NotifySnackbar, WarningSnackbar, ButtonLoading } from "@/utils/componentLoader";

const store = useStore();
const router = useRouter();

const isAuth = computed(() => store.getters?.isAuth);

if (isAuth.value) {
    router.replace({ name: 'Main Dashboard' });
}

const form = ref(false);
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const rules = ref(
    {
        emailOnly: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Your email is not in correct format',
        required: value => !!value || 'Required.',
    }
)

const isLoading = ref(false);

const onSubmit = () => {
    if (!form.value) return

    isLoading.value = true
    form.value = false;

    const body = {
        email: email.value,
        password: password.value
    }

    const login = async () => {
        try {
            const login = await store.dispatch('_login', body);
            emitNotify(true, true, login.message);
            window.location.replace(window.location.href); // refresh page
            isLoading.value = false
            form.value = true;
        }
        catch (error) {
            emitNotify(true, false, error);
            isLoading.value = false
            form.value = true;
        }
    }
    login();

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