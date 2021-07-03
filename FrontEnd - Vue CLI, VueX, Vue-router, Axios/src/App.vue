<!-- OC - Project 7 - Sebald Pauer -->

<template>
  <v-app>
    <!-- Barre de navigation [Groupe] (DEBUT) - Condition v-if: les données sur l'utilisateur existent dans le store -->
    <!-- Barre de navigation latérale (DEBUT) -->
    <v-card v-if="userId">
      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" mandatory color="indigo">
            <v-list-item to="/Accueil">
              <v-list-item-action>
                <v-icon>home</v-icon>
              </v-list-item-action>
              <v-list-item-content>Accueil</v-list-item-content>
            </v-list-item>
            <v-list-item to="/Publier" v-if="userIsAdmin === false">
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
            <v-list-item to="/Mur" v-if="userIsAdmin === false">
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
    <!-- Barre de navigation latérale (FIN) -->
    <!-- Barre de navigation horizontale (DEBUT) -->
    <v-app-bar v-if="userId" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"
        ><v-icon>menu</v-icon></v-app-bar-nav-icon
      >
      <v-toolbar-title> Groupomania </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text to="/Accueil">
          <v-icon left dark>home</v-icon>
          Accueil
        </v-btn>
        <v-btn text to="/Publier" v-if="userIsAdmin === false">
          <v-icon left dark>article</v-icon>
          Publier
        </v-btn>
        <v-btn text to="/Membres">
          <v-icon left dark>face</v-icon>
          Les membres
        </v-btn>
        <v-btn text to="/Mur" v-if="userIsAdmin === false">
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
    <!-- Barre de navigation horizontale (FIN) -->
    <!-- Barre de navigation [Groupe] (FIN) -->
    <!-- Header (Substitut de Barre de navigation) (DEBUT) - Condition v-else: les données sur l'utilisateur n'existent pas dans le store  -->
    <header v-else>
      <v-img
        class="mx-auto"
        contain
        max-height="300"
        max-width="500"
        src="@/assets/images/Logo/icon.png"
      ></v-img>
    </header>
    <!-- Header (Substitut de Barre de navigation) (FIN) -->
    <!-- Zone d'affichage du Vue Router (DEBUT) -->
    <router-view></router-view>
    <!-- Zone d'affichage du Vue Router (FIN) -->
    <!-- Barre d'alerte (DEBUT) - Condition v-model: le message existe dans le store -->
    <v-snackbar
      v-model="alertMessage.isVisible"
      :color="requestAlertColor"
      multi-line
    >
      {{ requestAlertMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" v-bind="attrs" icon @click.native="hideAlert">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Barre d'alerte (FIN) -->
    <!-- Pied de page (DEBUT) -->
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Groupomania</strong> — Sebald
        Pauer
      </v-col>
    </v-footer>
    <!-- Pied de page (FIN) -->
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "App",
  data: function () {
    return {
      appTitle: "Groupomania", // Intitulé de la barre de navigation
      drawer: false, // Afficher la barre latérale de navigation ?
      group: null, // Afficher le contenu de la barre latérale de navigation ?
    };
  },
  computed: {
    ...mapGetters([
      "userId",
      "userIsAdmin",
      "requestAlertMessage",
      "requestAlertColor",
    ]),
    ...mapState(["alertMessage"]), // Récupération des variables dans le store
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    hideAlert() {
      this.$store.dispatch("hideAlertMessage", false);
    },
    Logout() {
      // Méthode pour se déconnecter
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");
      this.$store.dispatch("alertMessage", {
        text: "",
        color: "",
        isVisible: false,
      });
      this.$store.dispatch("userInfo", {
        userId: null,
        pseudonym: "",
        image: "",
        isAdmin: false,
        newUser: false,
      });
      this.$router.push({ path: "/" }).catch(() => {});
    },
  },
};
</script>
