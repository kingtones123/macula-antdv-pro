// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales'
import bootstrap from './core/bootstrap'
// base library
import { ConfigProvider, Layout, Input, InputNumber, Button, Switch, Radio, Checkbox, Select, Card, Form, Row, Col, Modal, Table, Tabs, Icon, Badge, Popover, Dropdown, List, Avatar, Breadcrumb, Steps, Spin, Menu, Drawer, Tooltip, Alert, Tag, Divider, DatePicker, TimePicker, Upload, Progress, Skeleton, Popconfirm, PageHeader, Result, Statistic, Descriptions, message, notification } from 'ant-design-vue'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { PageLoading } from '@/components'
import themeConfig from './config/theme.config.js'

// 路由守卫
import './router/router-guards'
// 其他
import './styles/global.less'

// Ant Design Vue
Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
Vue.use(PageHeader)
Vue.use(Result)
Vue.use(Statistic)
Vue.use(Descriptions)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

// ProLayout
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
window.umi_plugin_ant_themeVar = themeConfig.theme

// Global imports
Vue.use(PageLoading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App),
}).$mount('#app')
