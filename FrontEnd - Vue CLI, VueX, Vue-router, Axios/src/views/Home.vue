<template>
  <v-main>
    <welcome-user />
    <message-sticker
      v-show="publications ? true : false"
      v-for="publication in publications"
      :key="publication.id"
      :messageId="publication.id"
      :authorId="publication.idUsers"
      :title="publication.title"
      :updatedAt="publication.updatedAt"
    />
    <v-alert v-show="publications ? true : false" dense outlined type="error">
      Aucune publication disponible !
    </v-alert>
    <router-link to="/Publier" v-if="user.isAdmin == false"
      ><i class="fas fa-plus-circle"></i
    ></router-link>
  </v-main>
</template>

<script>
import axios from "axios";

import WelcomeUser from "../components/WelcomeUser";
import MessageSticker from "../components/MessageSticker";

export default {
  name: "Home",
  components: {
    WelcomeUser,
    MessageSticker,
  },
  data: () => ({
    publications: {},
  }),
  async beforeCreate() {
    await axios
      .get("messages", {
        userId: sessionStorage.getItem("id") || "",
      })
      .then((response) => {
        this.$store.dispatch("message", {
          text: "",
          color: "",
          isVisible: false,
        });
        this.publications = response.data;
      })
      .catch((error) => {
        this.$store.dispatch("message", {
          text: "",
          color: "",
          isVisible: false,
        });
        this.$store.dispatch("message", {
          text: `Erreur ${error.status} - ${error.data.error}`,
          color: "red",
          isVisible: true,
        });
      });
  },
};
</script>
