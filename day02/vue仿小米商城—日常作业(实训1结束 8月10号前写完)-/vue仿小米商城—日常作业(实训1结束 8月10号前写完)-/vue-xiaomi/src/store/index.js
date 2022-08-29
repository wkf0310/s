import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import vuexPersist from "vuex-persist";
export default new Vuex.Store({
  state: {
    active: -1,
    list: 0,
  },
  mutations: {
    blue(state, i) {
      state.active = i
    },
    dian(state, i) {
      if (state.list == i) {
        state.list = 0;
      } else {
        state.list = i;
      }
    }
  },
  actions: {},
  modules: {},
  plugins: [
    new vuexPersist({
      localstorage: window.localStorage,
    }).plugin,
  ],
});
