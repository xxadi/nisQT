import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/groupManager',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'groupEdit',
        component: (resolve) => require(['@/views/groupManager/groupEdit'], resolve),
        name: '编辑组',
        meta: { title: '编辑组' }
      }
    ]
  },
  {
    path: '/reportcard',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/chuanranbing/reportcard'], resolve),
        name: '传染病报卡',
        meta: { title: '传染病报卡' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/exam/paper',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: (resolve) => require(['@/views/exam/testPaper/edit.vue'], resolve),
        name: '人工组卷',
        meta: { title: '人工组卷' }
      }
    ]
  },
  {
    path: '/fileupload/file',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/fileuploadzw/fileUpload/index.vue'], resolve),
        name: '上传文件',
        meta: { title: '上传文件' }
      }
    ]
  },
  {
    path: '/fileuploadzw/fileshow',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: (resolve) => require(['@/views/fileuploadzw/qtFileShow/edit.vue'], resolve),
        name: '文章内容',
        meta: { title: '文章内容' }
      }
    ]
  },
  {
    path: '/trainmanag/qtTrainShow',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: (resolve) => require(['@/views/trainmanagement/qtTrainShow/edit.vue'], resolve),
        name: '培训内容',
        meta: { title: '培训内容' }
      }
    ]
  }
  ,
  {
    path: '/trainmanag/trainShow',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: (resolve) => require(['@/views/trainmanagement/trainShow/edit.vue'], resolve),
        name: '培训内容',
        meta: { title: '培训内容' }
      }
    ]
  }
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
