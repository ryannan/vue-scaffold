/**
 * mulations 常量，根据页面组件来分组
 * 命名方式：[ACTION]_[CONTAINER]_[FUNCTION]_[COMPONENT]_[STATE]
 * ACTION: 行为[change, set, add...]
 * CONTAINER: 组件所在的父级容器或者所在页面
 * FUNCTION: 组件表示的业务功能名
 * COMPONENT: 组件[input, dropdown...]
 * STATE: 组件状态, 单一状态[open, close, show...]
 */

// ========================================
// 页面公共头部状态
// ========================================
export const CHANGE_HEADER_PROJECT_PANEL_STATE = 'change_header_project_panel_state'; // 我的工作空间下拉组件
