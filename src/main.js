import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";
import axios from "axios";
import config from "./config";

// Import the CSS or use your own!
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Import component
import VueLoading from "vue-loading-overlay";

// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

// Loading
Vue.component("loading", VueLoading);
Vue.use(Toast);

//Sweet alert
import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);

//PWA support
import wb from "./registerServiceWorker";
Vue.prototype.$workbox = wb;
Vue.config.productionTip = false;

//Vue prototype
Vue.prototype.$http = axios;
Vue.prototype.$config = config;

//Vue router
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
