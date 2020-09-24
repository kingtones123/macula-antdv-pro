import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'

// hack router push/replace callback
['push', 'replace'].map(key => {
  return {
    k: key,
    prop: VueRouter.prototype[key],
  }
}).forEach(item => {
  VueRouter.prototype[item.k] = function newCall (location, onResolve, onReject) {
    if (onResolve || onReject) return item.prop.call(this, location, onResolve, onReject)
    return item.prop.call(this, location).catch(err => err)
  }
})

Vue.use(VueRouter)

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RouterLayout,
      redirect: '/dashboard/Welcome',
      meta: {
        title: 'menu.home',
      },
      children: routes,
    },
    {
      path: '*', redirect: '/exception/404', hidden: true,
    },
  ],
})
