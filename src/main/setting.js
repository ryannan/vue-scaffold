import Vue from 'vue';
import router from '../router/setting';
import store from '../store';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';
import 'normalize.css';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'components/theme/base.sty';
import 'font-awesome/css/font-awesome.css';
import 'animate.css';
import Setting from 'components/Setting';

Vue.use(Element);
Vue.use(VueResource);

Vue.config.devtools = process.env.NODE_ENV !== 'production';

// add the router into the vuex store
// this registers `store.state.route`
sync(store, router);

const app = new Vue({
    router,
    store,
    ...Setting
}).$mount('#app');

export { app, router, store };
