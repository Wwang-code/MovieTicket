import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import 'vant/lib/index.css'
import {Search,DropdownMenu, 
  DropdownItem,Form,Field,Button,Notify,Area,
Overlay,Loading,Cell,CellGroup,Swipe, SwipeItem,Toast,
GoodsAction, GoodsActionIcon, GoodsActionButton,
RadioGroup, Radio,Card,SubmitBar,ActionSheet,Rate } from 'vant'

Vue.prototype.axios = axios
Vue.use(VueCookies)

Vue.use(Search)
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button)
Vue.use(Area)
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Swipe);
Vue.use(SwipeItem)
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Card);
Vue.use(SubmitBar);
Vue.use(ActionSheet);
Vue.use(Rate);
Vue.use(Notify)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
