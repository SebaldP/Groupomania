import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requestState: "",
    userInfo: {
      userId: null,
      pseudonym: "",
      image: "",
      isAdmin: false,
      newUser: false,
    },
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
      state.userInfo.userId = userInfo.userId;
      state.userInfo.pseudonym = userInfo.pseudonym;
      state.userInfo.image = userInfo.image;
      state.userInfo.isAdmin = userInfo.isAdmin;
      state.userInfo.newUser = userInfo.newUser;
    },
    alertMessage(state, alertMessage) {
      state.alertMessage.text = alertMessage.text;
      state.alertMessage.color = alertMessage.color;
      state.alertMessage.isVisible = alertMessage.isVisible;
    },
    hideAlertMessage(state, alertMessage) {
      state.alertMessage.isVisible = alertMessage.isVisible;
    },
  },
  actions: {
    requestState(context, requestState) {
      context.commit("requestState", requestState);
    },
    userInfo(context, userInfo) {
      context.commit("userInfo", userInfo);
      console.log("Mutation effectuée: User");
    },
    alertMessage(context, alertMessage) {
      context.commit("alertMessage", alertMessage);
      console.log("Mutation effectuée: Alert");
    },
    hideAlertMessage(context, hideAlertMessage) {
      context.commit("hideAlertMessage", hideAlertMessage);
      console.log("Mutation effectuée: Alert (caché)");
    },
  },
  modules: {},
});
