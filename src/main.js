import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/common.scss';
import App from './App.vue';
import UiSchema from './components/ui-schema/index.jsx';
import IF from './components/If/index.jsx';
import InfoTips from './components/InfoTips/index.jsx';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.component('uiSchema', UiSchema);
Vue.component('If', IF);
Vue.component('InfoTips', InfoTips);

new Vue({
  render: h => h(App),
}).$mount('#app');
