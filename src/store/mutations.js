import * as types from './mutation-types';

export default {
    // page header 中我的空间按钮状态
    [types.CHANGE_HEADER_PROJECT_PANEL_STATE] (state) {
        state.isHeaderProjectPanelShow = !state.isHeaderProjectPanelShow;
    }
};
