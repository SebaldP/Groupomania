import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tokenValue: sessionStorage.getItem("token") || "",
    idValue: sessionStorage.getItem("id") || "",
    requestState: "",
    userInfo: {
      userId: null,
      pseudonym: "",
      avatar: "",
      isAdmin: false,
      isModerator: false,
      newUser: false,
    },
    alertMessage: {
      text: "",
      backgroundColor: "",
      color: "",
      isVisible: false,
    },
    color: {
      lightRed: "rgb(255, 215, 215)",
      darkRed: "rgb(253, 45, 1)",
      lightYellow: "rgb(255, 254, 189)",
      lightBlue: "rgb(189, 229, 255)",
      darkBlue: "rgb(25, 96, 252)",
    },
  },
  getters: {
    tokenSession: (state) => {
      return state.tokenValue;
    },
    idSession: (state) => {
      return state.idValue;
    },
    newUser: (state) => {
      return state.userInfo.newUser;
    },
    userId: (state) => {
      return state.userInfo.userId;
    },
    userIsAdmin: (state) => {
      return state.userInfo.isAdmin;
    },
    userIsModerator: (state) => {
      return state.userInfo.isModerator;
    },
    userPseudonym: (state) => {
      return state.userInfo.pseudonym;
    },
    userAvatar: (state) => {
      return state.userInfo.avatar;
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
    requestAlertBackgroundColor: (state) => {
      return state.alertMessage.backgroundColor;
    },
    requestAlertIsVisible: (state) => {
      return state.alertMessage.isVisible;
    },
    colorLightRed: (state) => {
      return state.color.lightRed;
    },
    colorDarkRed: (state) => {
      return state.color.darkRed;
    },
    colorLightYellow: (state) => {
      return state.color.lightYellow;
    },
    colorLightBlue: (state) => {
      return state.color.lightBlue;
    },
    colorDarkBlue: (state) => {
      return state.color.darkBlue;
    },
  },
  mutations: {
    idSession(state, newValue) {
      sessionStorage.setItem("id", newValue);
      state.idValue = newValue;
    },
    tokenSession(state, newValue) {
      sessionStorage.setItem("token", newValue);
      state.tokenValue = newValue;
    },
    logOutSession(state) {
      state.idValue = "";
      state.tokenValue = "";
      sessionStorage.clear();
    },
    requestState(state, requestState) {
      state.requestState = requestState;
    },
    userInfo(state, userInfo) {
      state.userInfo.userId = userInfo.userId;
      state.userInfo.pseudonym = userInfo.pseudonym;
      state.userInfo.avatar = userInfo.avatar;
      state.userInfo.isAdmin = userInfo.isAdmin;
      state.userInfo.isModerator = userInfo.isModerator;
      state.userInfo.newUser = userInfo.newUser;
    },
    alertMessage(state, alertMessage) {
      state.alertMessage.text = alertMessage.text;
      state.alertMessage.backgroundColor = alertMessage.backgroundColor;
      state.alertMessage.color = alertMessage.color;
      state.alertMessage.isVisible = alertMessage.isVisible;
    },
    hideAlertMessage(state, alertMessage) {
      state.alertMessage.isVisible = alertMessage.isVisible;
    },
  },
  actions: {
    idSession(context, idSession) {
      context.commit("idSession", idSession);
    },
    tokenSession(context, tokenSession) {
      context.commit("tokenSession", tokenSession);
    },
    logOutSession(context) {
      context.commit("logOutSession");
    },
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
