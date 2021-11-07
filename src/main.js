import Vue from 'vue'
import App from './App.vue'
import InputV from './components/InputV.vue'

Vue.component("inputV", InputV);

new Vue({
  el: '#app',
  render: h => h(App)
})
