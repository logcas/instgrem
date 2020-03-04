import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter(mode = 'history') {
  return new Router({
    mode,
    routes: [
      {
        component: () => import('@/views/News'),
        path: '/',
        name: 'news'
      },
      {
        component: () => import('@/views/About'),
        path: '/about',
        name: 'about'
      },
      {
        path: '/news',
        redirect: '/'
      }
    ],
    scrollBehavior() {
      return {
        x: 0,
        y: 0
      };
    }
  });
}