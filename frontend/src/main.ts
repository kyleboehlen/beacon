import { createApp } from 'vue'
import { createPinia } from 'pinia'
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

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Preline UI
import("preline/dist/index.js");
