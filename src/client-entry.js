import Vue from 'vue';
import {
  createApp
} from './app.js';
import ProgressBar from '@/components/ProgressBar.vue';
import 'normalize.css';
import '@/assets/style/basic.css';

const progress = Vue.prototype.$progress = new Vue(ProgressBar).$mount();
document.body.appendChild(progress.$el);

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    progress.start();
    const {
      asyncData
    } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(() => {
        progress.finish();
        next();
      }).catch(() => {
        progress.fail();
        next();
      });
    } else {
      next()
    }
  }
});

const {
  app,
  router,
  store
} = createApp();

window.isSSR = false;

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
  window.isSSR = true;
}

router.onReady(() => {

  /**
   * 当客户端渲染时 router.beforeResolve 才刚刚监听，并不会发生回调，需要手动调用 asyncData
   */
  if (!window.isSSR) {
    progress.start();
    const Components = router.getMatchedComponents();
    Promise.all(Components.map(Component => Component.asyncData && Component.asyncData({
      store,
      route: router.currentRoute
    }))).then(() => {
      progress.finish();
    }).catch(() => {
      progress.fail();
    });
  }

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activatedComponents = matched.filter((currentComponent, index) => {
      return diffed || (diffed = (prevMatched[index] !== currentComponent));
    });
    const asyncDataHooks = activatedComponents.map(Component => Component.asyncData).filter(fn => fn);
    if (!asyncDataHooks.length) {
      return next();
    }
    progress.start();
    Promise.all(asyncDataHooks.map(hook => hook({
        store,
        route: to
      })))
      .then(() => {
        progress.finish();
        next();
      }).catch(() => {
        progress.fail();
        next();
      });
  });

  window.isSSR ? app.$mount('#app') : app.$mount('#de-app');
});