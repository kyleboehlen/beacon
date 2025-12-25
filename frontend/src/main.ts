import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import "preline"

import App from './App.vue'
import router from './app/router'

// Optional third-party libraries for preline - enable as needed - also enable in global.d.ts
// import $ from "jquery";
// window.$ = $;

// import _ from "lodash";
// window._ = _;

// import noUiSlider from "nouislider";
// window.noUiSlider = noUiSlider;

// import "datatables.net";
// window.DataTable = $.fn.dataTable;

// import "dropzone/dist/dropzone-min.js";

// import * as VanillaCalendarPro from "vanilla-calendar-pro";
// window.VanillaCalendarPro = VanillaCalendarPro;
// End optional third-party libraries

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')

// Preline UI
import('preline/dist/index.js')
