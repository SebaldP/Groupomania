import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vuelidate from "vuelidate";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${sessionStorage.getItem("token")}` || "";

Vue.use(VueAxios, axios);
Vue.use(vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
