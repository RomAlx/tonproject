import { createApp } from 'vue';
import VueCookies from "vue-cookies";
import App from './App.vue'
import router from "./router";
import store from "./store";
import {i18n} from './i18n'
import VueAnimXyz from "@animxyz/vue3";
import "@animxyz/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/css/style.less";
import 'highlight.js/styles/tomorrow-night-bright.css';

createApp(App)
    .use(i18n)
    .use(router)
    .use(store)
    .use(VueAnimXyz)
    .use(VueCookies, {expires:"7d"})
    .mount('#app');
