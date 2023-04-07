<template>
    <div>
        <h1 class="font-bold text-4xl">Login</h1>
        <div class="login-form w-[30vw] h-fit mx-auto">
            <v-form v-model="form" @submit.prevent="onSubmit">

                <v-text-field v-model="email" :readonly="loading" :rules="[rules.required, rules.emailOnly]" class="mb-2"
                    clearable prepend-inner-icon="mdi-at" label="Email">
                </v-text-field>

                <v-text-field v-model="password" :readonly="loading" :rules="[rules.required]"
                    :type="showPassword ? 'text' : 'password'" clearable prepend-inner-icon="mdi-lock" label="Password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" placeholder="Enter your password"
                    @click:append="showPassword = !showPassword">
                </v-text-field>

                <v-btn v-ripple :disabled="!form" :loading="loading" block color="#0ea5e9" class="text-white mt-6" size="large" type="submit"
                    variant="elevated">
                    Login
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { comment } from "postcss";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const isAuth = computed(() => store.getters?.isAuth);

if(isAuth.value){
    router.replace({name: 'Main Dashboard'});
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

const loading = ref(false);


const onSubmit = () => {
    if (!form.value) return

    const body = {
        email: email.value,
        password: password.value
    }

    const login = async () => {
        try {
            const login = await store.dispatch('_login', body);
            window.location.replace(window.location.href); // refresh page
        }
        catch (error) {
            alert(error);
            console.error(error);
        }
    }
    login();

}



</script>