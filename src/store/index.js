import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    // 严格模式，state 必须 由 mutation 修改
    strict: process.env.NODE_ENV !== 'production',
    state,
    actions,
    mutations
});

export default store;
