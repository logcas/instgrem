import Vuex from 'vuex';
import Vue from 'vue';
import { fetchNews } from '@/api';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      type: 0,
      page: 0,
      hasMore: true,
      newsList: []
    },
    actions: {
      fetchNews({
        commit,
        state
      }) {
        return fetchNews(state.type, state.page).then(res => {
          res = res.data;
          commit('setNews', {
            news: res.data,
            hasMore: res.hasMore
          });
        }).catch(err => {
          console.log(err);
        });
      }
    },
    mutations: {
      setSearchCondition(state, {
        type,
        page
      }) {
        type = isNaN(+type) ? 0 : +type;
        page = isNaN(+page) ? 0 : +page;
        page = Math.max(page, 0);
        state.type = type;
        state.page = page;
      },
      setNews(state, {
        news,
        hasMore
      }) {
        state.newsList = news;
        state.hasMore = hasMore;
      }
    }
  });
}