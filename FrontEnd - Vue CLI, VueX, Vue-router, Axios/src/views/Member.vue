<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="2">
          <user-sticker :id="user" :pseudonym="pseudonym" :avatar="avatar" />
        </v-col>
        <v-col cols="12" sm="2">
          <message-sticker
            v-show="publications ? true : false"
            v-for="publication in publications"
            :key="publication.id"
            :messageId="publication.id"
            :title="publication.title"
            :updatedAt="publication.updatedAt"
            @click="this.$router.push(`/Publication/${publication.id}`)"
          />
          <v-alert
            v-show="publications ? false : true"
            dense
            outlined
            type="err"
          >
            Aucune publication disponible !
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import userService from "../service/userService";

import MessageSticker from "../components/MessageSticker";
import UserSticker from "../components/UserSticker";

export default {
  name: "Member",
  components: {
    MessageSticker,
    UserSticker,
  },
  data: () => ({
    user: null,
    pseudonym: "",
    avatar: "",
    publications: {},
  }),
  async beforeCreate() {
    const bodyContent = {
      userId: sessionStorage.getItem("id") || "",
    };
    await userService.getOneProfile(
      this.$route.params.id,
      bodyContent,
      (res) => {
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
        this.user = res.data.id;
        this.pseudonym = res.data.pseudonym;
        this.avatar = res.data.image;
      },
      (err) => {
        this.$store.dispatch("alertMessage", {
          text: `Erreur ${err.status} - ${err.data.err}`,
          color: "red",
          isVisible: true,
        });
      }
    );
    await userService.getAllMessagesProfile(
      this.$route.params.id,
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
};
</script>
