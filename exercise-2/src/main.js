import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import userService from './services/user.service';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  provide: {
    userService: new userService()
  },
  render: h => h(App)
}).$mount('#app')
