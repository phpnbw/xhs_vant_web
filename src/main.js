import Vue from 'vue'
import App from './App.vue'
import {router} from './router/router.js';

//引入Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//h5 rem适配
import 'amfe-flexible/index.js'









Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
