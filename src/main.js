import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueLayers from "vuelayers";
import "./utils/axios";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import 'vuelayers/lib/style.css'

Vue.use(VueLayers);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
