import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// import Workbench from 'components/workbench';
// import ItemView from '../views/ItemView.vue';
// import UserView from '../views/UserView.vue';

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        // { path: '/workbench', component: Workbench },
        // { path: '/new/:page(\\d+)?', component: createListView('new') },
        // { path: '/show/:page(\\d+)?', component: createListView('show') },
        // { path: '/ask/:page(\\d+)?', component: createListView('ask') },
        // { path: '/job/:page(\\d+)?', component: createListView('job') },
        // { path: '/item/:id(\\d+)', component: ItemView },
        // { path: '/user/:id', component: UserView },
        // { path: '*', redirect: '/workbench' }
    ]
});