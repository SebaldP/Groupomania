import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requestState: "",
    userInfo: {},
    alertMessage: {
      text: "",
      color: "",
      isVisible: false,
    },
  },
  getters: {
    newUser: (state) => {
      return state.userInfo.newUser;
    },
    userId: (state) => {
      return state.userInfo.userId;
    },
    userIsAdmin: (state) => {
      return state.userInfo.isAdmin;
    },
    userPseudonym: (state) => {
      return state.userInfo.pseudonym;
    },
    userAvatar: (state) => {
      return state.userInfo.image;
    },
    requestState: (state) => {
      return state.requestState;
    },
    requestAlertMessage: (state) => {
      return state.alertMessage.text;
    },
    requestAlertColor: (state) => {
      return state.alertMessage.color;
    },
    requestAlertIsVisible: (state) => {
      return state.alertMessage.isVisible;
    },
  },
  mutations: {
    requestState(state, requestState) {
      state.requestState = requestState;
    },
    userInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    alertMessage(state, alertMessage) {
      state.alertMessage = alertMessage;
    },
  },
  actions: {
    requestState(context, requestState) {
      context.commit("requestState", requestState);
    },
    userInfo(context, userInfo) {
      context.commit("userInfo", userInfo);
    },
    alertMessage(context, alertMessage) {
      context.commit("alertMessage", alertMessage);
    },
  },
  modules: {},
});
