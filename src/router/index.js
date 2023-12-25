import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: { name: '大廳' },
    meta: {
      requireAuth: false, // 判斷是否需要驗證會員登入
    },
    children: [
      {
        path: 'account',
        name: '我的帳號',
        component: () => import('../views/My_Account.vue'),
        meta: { title: '我的帳號' },
      },
      {
        path: 'composition',
        name: '起手式練習',
        component: () => import('../views/Composition.vue'),
        meta: { title: '起手式練習' },
      },
      {
        path: 'loby',
        name: '大廳',
        component: () => import('../views/Loby.vue'),
        meta: { title: '大廳' },
      },
      {
        path: 'testLoby',
        name: '測試大廳',
        component: () => import('../views/TestLoby.vue'),
        meta: { title: '測試大廳' },
      },
    ],
  },
  {
    path: '/livechart',
    name: 'livechart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/LiveChart/LiveChart.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
