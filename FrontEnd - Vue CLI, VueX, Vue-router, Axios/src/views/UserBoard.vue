<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="2">
          <user-sticker
            :id="userId"
            :pseudonym="userPseudonym"
            :avatar="userAvatar"
          />
          <modify-profile-form
            :pseudonym="userPseudonym"
            :avatar="userAvatar"
          />
        </v-col>
        <v-col cols="12" sm="2">
          <message-sticker
            v-show="!!publications.length ? true : false"
            v-for="publication in publications"
            :key="publication.id"
            :messageId="publication.id"
            :title="publication.title"
            :updatedAt="publication.updatedAt"
            @click="
              this.$router.push({ path: `/Publication/${publication.id}` })
            "
          />
          <v-alert v-show="!!publications.length ? false : true" dense outlined>
            Aucune publication disponible !
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

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
    publications: {},
  }),
  async beforeCreate() {
    
    await this.$axios
      .get(
        `http://localhost:3000/api/user/profile/${sessionStorage.getItem(
          "id"
        )}/messages?userId=${sessionStorage.getItem("id")}`,)
      .then((res) => {
        console.log(res.data);
        Object.assign(this.publications, JSON.parse(res.data));
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.error);
        this.$store.dispatch("alertMessage", {
          text: `Erreur ${err.status} - ${err.alert}`,
          color: "red",
          isVisible: true,
        });
      });
  },
  computed: {
    ...mapGetters(["userId", "userPseudonym", "userAvatar"]),
  },
};
</script>
