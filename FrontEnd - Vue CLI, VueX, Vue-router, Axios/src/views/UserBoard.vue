<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="2">
          <user-sticker :id="user" :pseudonym="pseudonym" :avatar="avatar" />
          <modify-profile-form v-if="user.id == id" />
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
            type="error"
          >
            Aucune publication disponible !
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

import MessageSticker from "../components/MessageSticker";
import UserSticker from "../components/UserSticker";
import ModifyProfileForm from "../components/ModifyProfileForm";

export default {
  name: "UserBoard",
  components: {
    MessageSticker,
    UserSticker,
    ModifyProfileForm,
  },
  data: () => ({
    user: null,
    pseudonym: "",
    avatar: "",
    publications: {},
  }),
  async beforeCreate() {
    await axios
      .get("user/profile/" + sessionStorage.getItem("id"), {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        body: {
          userId: sessionStorage.getItem("id") || "",
        },
      })
      .then((response) => {
        this.$store.dispatch("message", {
          text: "",
          color: "",
          isVisible: false,
        });
        this.user = response.data.id;
        this.pseudonym = response.data.pseudonym;
        this.avatar = response.data.image;
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
    await axios
      .get("user/profile/" + sessionStorage.getItem("id") + "/messages", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        body: {
          userId: sessionStorage.getItem("id") || "",
        },
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
