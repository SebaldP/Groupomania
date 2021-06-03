<template>
  <v-app>
    <v-card v-if="user">
      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" mandatory color="indigo">
            <v-list-item to="/Accueil">
              <v-list-item-action>
                <v-icon>home</v-icon>
              </v-list-item-action>
              <v-list-item-content>Accueil</v-list-item-content>
            </v-list-item>
            <v-list-item to="/Publier">
              <v-list-item-action>
                <v-icon>article</v-icon>
              </v-list-item-action>
              <v-list-item-content>Publier</v-list-item-content>
            </v-list-item>
            <v-list-item to="/Membres">
              <v-list-item-action>
                <v-icon>face</v-icon>
              </v-list-item-action>
              <v-list-item-content>Les membres</v-list-item-content>
            </v-list-item>
            <v-list-item to="/Mur" v-if="user.isAdmin === false">
              <v-list-item-action>
                <v-icon>account_circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>Mon profil</v-list-item-content>
            </v-list-item>
            <v-list-item to="/Admin" v-else>
              <v-list-item-action>
                <v-icon>manage_accounts</v-icon>
              </v-list-item-action>
              <v-list-item-content>Panneau de contrôle</v-list-item-content>
            </v-list-item>
            <v-list-item to="/" @click="Logout">
              <v-list-item-action>
                <v-icon>logout</v-icon>
              </v-list-item-action>
              <v-list-item-content>Déconnection</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-app-bar v-if="user" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"
        ><v-icon>menu</v-icon></v-app-bar-nav-icon
      >
      <v-toolbar-title>
        <router-link to="/Accueil" tag="span" style="cursor: pointer">
          Groupomania
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text to="/Accueil">
          <v-icon left dark>home</v-icon>
          Accueil
        </v-btn>
        <v-btn text to="/Publier">
          <v-icon left dark>article</v-icon>
          Publier
        </v-btn>
        <v-btn text to="/Membres">
          <v-icon left dark>face</v-icon>
          Les membres
        </v-btn>
        <v-btn text to="/Mur" v-if="user.isAdmin === false">
          <v-icon left dark>account_circle</v-icon>
          Mon profil
        </v-btn>
        <v-btn text to="/Admin" v-else>
          <v-icon left dark>manage_accounts</v-icon>
          Panneau de contrôle
        </v-btn>
        <v-btn text to="/" @click="Logout">
          <v-icon left dark>logout</v-icon>
          Déconnection
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <header v-else>
      <v-img
        class="mx-auto"
        contain
        max-height="300"
        max-width="500"
        src="./assets/images/Logo/icon.png"
      ></v-img>
    </header>
    <router-view />
    <v-snackbar v-model="message.isVisible" :color="message.color" multi-line>
      {{ message.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="this.$store.dispatch('message', null)"
        >
          FERMER
        </v-btn>
      </template>
    </v-snackbar>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data: () => ({
    appTitle: "Groupomania",
    drawer: false,
    group: null,
  }),
  computed: {
    ...mapGetters(["message", "user"]),
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    Logout() {
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");
      this.$stote.dispatch("message", null);
      this.$stote.dispatch("user", null);
      this.$router.push("/");
    },
    toggleNav: (a) => {
      a = !a;
      setTimeout(this.toggleNav(a), 10000);
    },
  },
};
</script>
