<template>
  <v-app>
    <navbar />
    <router-view />
    <message-popup :isVisible="isVisible" :text="message" />
    <c-footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "./components/Navbar";
import CFooter from "./components/Footer";
import MessagePopup from "./components/MessagePopup";

export default {
  name: "App",
  components: {
    Navbar,
    CFooter,
    MessagePopup,
  },
  watch: {
    isVisible() {
      console.log(this.message);
      return this.message ? true : false;
    },
  },
  computed: {
    ...mapGetters(["message"]),
    ...mapGetters(["user"]),
  },
};
</script>
