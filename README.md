English | [简体中文](./README.zh-CN.md)

<h1 align="center">Ant Design Vue Pro</h1>
<div align="center">
An out-of-box UI solution for enterprise applications as a Vue boilerplate. based on  <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a>
</div>

<div align="center">

[![License](https://img.shields.io/npm/l/package.json.svg?style=flat)](https://github.com/vueComponent/ant-design-vue-pro/blob/master/LICENSE)
[![Release](https://img.shields.io/github/release/vueComponent/ant-design-vue-pro.svg?style=flat)](https://github.com/vueComponent/ant-design-vue-pro/releases/latest)
[![Travis branch](https://travis-ci.org/vueComponent/ant-design-vue-pro.svg?branch=master)](https://travis-ci.org/vueComponent/ant-design-vue-pro)

</div>

- Preview: https://preview.pro.antdv.com
- Home Page: https://pro.antdv.com
- Documentation: https://pro.antdv.com/docs/getting-started
- ChangeLog: https://pro.antdv.com/docs/changelog
- FAQ: https://pro.antdv.com/docs/faq

Overview
----

![dashboard](https://static-2.loacg.com/open/static/github/sp3.png)

### Env and dependencies

- node
- eslint
- @vue/cli
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Macula-Antdv-Vue改动点
- 引入了[vue-auto-routing](https://github.com/ktsn/vue-auto-routing)
- 引入了[vue-router-layout](https://github.com/ktsn/vue-router-layout)
- 注意子目录的vue文件一定要生成嵌套路由，怎么生成可以参考[vue-route-generator](https://github.com/ktsn/vue-route-generator)具体生成的路由和layout使用可以参考上述网站

- 去掉了前端权限，由于路由是自动生成的，所以菜单和路由无关，权限由后端访问的接口控制，菜单数据需要注意name、path，例如：
```
  // home
  {
    'id': 0,
    'name': 'home',         // 这个名字必须和自动产生的路由名称保持一致，否则会影响面包屑的生成
    'path': '/',            // 虽然是目录，但是这个很重要，不写会导致菜单点一下就缩起来
    'meta': {
      'title': '首页',
    },
  },
  // dashboard
  {
    'id': 1,
    'parentId': 0,
    'name': 'dashboard',    // 这个名字必须和自动产生的路由名称保持一致，否则会影响面包屑的生成
    'path': '/dashboard',   // 这个很重要，不写会导致菜单点一下就缩起来
    'meta': {
      'icon': 'dashboard',
      'title': '仪表盘',
    },
  },
  {
    'id': 7,
    'parentId': 1,
    'name': 'dashboard-Welcome',
    'path': '/dashboard/Welcome',
    'meta': {
      'title': '工作台',
    },
  },
  {
    'id': 3,
    'parentId': 1,
    'name': 'dashboard-monitor',
    'path': 'https://www.baidu.com/',
    'meta': {
      'title': '监控页（外部）',
      'target': '_blank',
    },
  },
```
- 在路由定义文件src/router/index.js中，会把自动生成的路由加入到根路由中
```
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RouterLayout,  // 布局
      redirect: '/dashboard/Welcome',
      meta: {
        title: 'menu.home',
      },
      children: routes, // 自动产生的路由
    },
    {
      path: '*', redirect: '/exception/404', hidden: true,
    },
  ],
})
```

- 在文件src/router/router-guards.js文件修改菜单的rootId
```
    // generate dynamic menus by rootId，这里0是根菜单的ID
    store.dispatch('GenerateMenus', 0).then(() => {
    // 请求带有 redirect 重定向时，登录自动重定向到该地址
    const redirect = decodeURIComponent(from.query.redirect || from.meta.redirect || to.path)
    if (to.path === redirect) {
        // set the replace: true so the navigation will not leave a history record
        next({ ...to, replace: true })
    } else {
        // 跳转到目的路由
        next({ path: redirect })
    }
    })
```
同时，可以结合这里的逻辑，处理登录跳转问题

- 定义API的上下文路径，在src/utils/request.js中，定义了默认API请求的前缀VUE_APP_API_BASE_URL
```
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
})
```
