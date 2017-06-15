import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import TimezoneMap from './components/timezone-map.vue'
import ChooseLocation from './components/choose-location.vue'
import Watch from './components/watch.vue';
import UserLoc from './components/user-location.vue';

Vue.use(BootstrapVue);

Vue.component('timezone-map', TimezoneMap);
Vue.component('choose-location', ChooseLocation);
Vue.component('watch', Watch);
Vue.component('user-location', UserLoc);

new Vue({
  el: '#app',
  render: h => h(App)
});