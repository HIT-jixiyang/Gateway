import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/register', component: _import('register/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/bill',
    component: Layout,
    redirect: '/bill/list',
    meta: { roles: ['admin','consumer'] },
    children: [{
      path: 'list',
      component: _import('bill/billList'),
      name: 'billList',
      meta: {
        title: 'billList',
        icon: 'lock'
      }
    }]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/check',
    meta: { roles: ['admin'] },
    children: [{
      path: 'list',
      component: _import('admin/check'),
      name: 'check',
      meta: {
        title: 'check',
        icon: 'lock'
      }
    }]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/apilist',
    meta: { roles: ['admin','sp'] },
    children: [
      {path: 'apilist', component: _import('api/apilist'), name: 'apilist', meta: {title: 'apilist', icon: 'lock'}},
      {path: 'apidetail', component: _import('api/apidetail'), name: 'apidetail', meta: {title: 'apidetail', icon: 'lock'},hidden:true},

    ]
  },
  {
    path:'/sp',
    component:Layout,
    redirect:'/sp/addapi',
    meta:{title:'addapi',roles:['sp'],icon:'lock'},
    children:[
      {path:'addapi', component:_import('api/api'), name:'addapi', meta:{title:'addapi', icon:'lock'}},

    ]
  },
  {
    path: '/apicategory',
    component: Layout,
    redirect: '/apicategory/search',
    meta: { title: 'apiCategory', roles: ['admin','consumer'],icon: 'lock' },
    children: [
      {path: 'search',component: _import('apicategory/apiCategorySearch'),name: 'apiCategorySearch',meta: {title: 'apiCategorySearch',icon: 'lock'}},
      {path: 'detail',component: _import('apicategory/apiCategoryDetail'),name: 'apiCategoryDetail',meta: {title: 'apiCategoryDetail',icon: 'lock'}, hidden:true},
      {path: 'add',component: _import('apicategory/apiCategoryAdd'),name: 'apiCategoryAdd',meta: {title: 'apiCategoryAdd',icon: 'lock'}, hidden:true},
    ]
  },
  {
    path:'/appmanage',
    component:Layout,
    redirect:'/appmange/list',
    meta:{title:'appmanage',roles:['consumer'],icon:'lock'},
    children:[
      {path:'list',component:_import('appmanage/appList'),name:'appList',meta:{title:'appManage',icon:'lock'}},
      {path:'add',component:_import('appmanage/appAdd'),name:'appAdd',meta:{title:'appAdd',icon:'lock'},hidden:true},
      {path:'detail',component:_import('appmanage/appDetail'),name:'appDetail',meta:{title:'appDetail',icon:'lock'},hidden:true},
      {path:'edit',component:_import('appmanage/appEdit'),name:'appEdit',meta:{title:'appEdit',icon:'lock'},hidden:true}
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',

    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
