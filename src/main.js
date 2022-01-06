import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import UiSchema from "./components/ui-schema/index.jsx";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.component("uiSchema", UiSchema);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
