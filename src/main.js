import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from './stores';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import "./assets/main.css";

// Init
const app = createApp(App);
const vuetify = createVuetify({
    components,
    directives,
  })

app.use(store);
app.use(router);
app.use(vuetify);
app.mount("#app");
