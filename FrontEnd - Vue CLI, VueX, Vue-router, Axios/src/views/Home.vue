<template>
  <v-main>
    <welcome-user />
    <message-sticker
      v-show="!!publications.length ? true : false"
      v-for="publication in publications"
      :key="publication.id"
      :messageId="publication.id"
      :authorId="publication.idUsers"
      :title="publication.title"
      :updatedAt="publication.updatedAt"
    />
    <v-alert
      v-show="!!publications.length ? false : true"
      dense
      outlined
      type="err"
    >
      Aucune publication disponible !
    </v-alert>
    <router-link to="/Publier" v-if="userIsAdmin == false"
      ><i class="fas fa-plus-circle"></i
    ></router-link>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import messageService from "../service/messageService";

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
    const bodyContent = {
      userId: sessionStorage.getItem("id") || "",
    };
    await messageService.getAllMessages(
      bodyContent,
      (res) => {
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
        this.publications = res.data;
      },
      (err) => {
        this.$store.dispatch("alertMessage", {
          text: `Erreur ${err.status} - ${err.data.err}`,
          color: "red",
          isVisible: true,
        });
      }
    );
  },
  computed: {
    ...mapGetters(["userId", "userIsAdmin", "userPseudonym", "userAvatar"]),
  },
};
</script>
