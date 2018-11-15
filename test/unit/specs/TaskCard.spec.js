import Vue from 'vue';
import VueResource from 'vue-resource';
import Element from 'element-ui';
import TaskCard from 'components/workbench/TaskCard.vue';

Vue.use(VueResource);
Vue.use(Element);

describe('TaskCard.vue', function () {
    // asserting JavaScript options
    it('task-card should have correct rows', function () {
        expect(TaskCard.data().rows).to.be.an('array');
    });

    it('mock http response data', function () {
        const vm = new Vue(TaskCard).$mount();
        // 模拟数据
        vm.rows = [{ name: 'Ryan' }];

        // 在状态改变后和断言DOM更新前等待一刻
        Vue.nextTick(() => {
            expect(vm.$el.querySelector('.card-container .card-title').textContent).to.be.equal('Ryan');
        });
    });
});
