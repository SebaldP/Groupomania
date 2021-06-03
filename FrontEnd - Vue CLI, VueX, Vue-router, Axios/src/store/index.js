import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    message: {
      text: "",
      color: "",
      isVisible: false,
    },
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    message: (state) => {
      return state.message;
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    message(state, message) {
      state.message = message;
    },
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    message(context, message) {
      context.commit("message", message);
    },
  },
  modules: {},
});
