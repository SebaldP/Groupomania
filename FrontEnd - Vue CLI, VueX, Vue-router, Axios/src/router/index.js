import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Member from "../views/Member.vue";
import MemberList from "../views/MemberList.vue";
import UserBoard from "../views/UserBoard.vue";
import AdminBoard from "../views/AdminBoard.vue";
import Message from "../views/Message.vue";
import MessageForm from "../views/MessageForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Accueil",
    name: "Home",
    component: Home,
  },
  {
    path: "/Membres",
    name: "MemberList",
    component: MemberList,
  },
  {
    path: "/Membre/:id",
    name: "Member",
    component: Member,
  },
  {
    path: "/Mur",
    name: "User",
    component: UserBoard,
  },
  {
    path: "/Admin",
    name: "Admin",
    component: AdminBoard,
  },
  {
    path: "/Publication/:id",
    name: "Message",
    component: Message,
  },
  {
    path: "/Publier",
    name: "MessageForm",
    component: MessageForm,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
