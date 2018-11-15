import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// import WorkPanel from 'components/setting/WorkPanel';

export default new Router({
    // mode: 'history',
    // scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/workspace', component: WorkPanel },
        { path: '/', redirect: '/workspace' }
    ]
});
