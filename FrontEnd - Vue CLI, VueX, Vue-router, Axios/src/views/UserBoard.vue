<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
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
        <v-col cols="12" sm="8">
          <message-sticker
            v-show="!!publications.length ? true : false"
            v-for="publication in publications"
            :key="publication.id"
            :messageId="publication.id"
            :title="publication.title"
            :updatedAt="publication.updatedAt"
            @click="
              this.$router
                .push({ path: `/Publication/${publication.id}` })
                .catch(() => {})
            "
          />
          <v-alert
            v-show="!!publications.length ? false : true"
            outlined
            type="warning"
            prominent
            border="left"
          >
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
  data: function () {
    return {
      publications: {},
    };
  },
  async beforeCreate() {
    const authOptions = {
      method: "GET",
      baseURL: "http://localhost:3000/api/",
      url: `/user/profile/${sessionStorage.getItem(
        "id"
      )}/messages?g=${sessionStorage.getItem("id")}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    await this.$axios(authOptions)
      .then((res) => {
        console.log({
          RESULT: {
            data: res.data,
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
            config: res.config,
          },
        });
        Object.assign(this.publications, JSON.parse(res.data));
      })
      .catch((err) => {
        console.log({
          ERROR: {
            DATA: err.response.data,
            STATUS: err.response.status,
            HEADERS: err.response.headers,
            MESSAGE: err.message,
            REQUEST: err.request,
            CONFIG: err.config,
          },
        });
        this.$store.dispatch("alertMessage", {
          text: `Erreur ${err.response.status} - ${err.response.data.alert}`,
          color: "error",
          isVisible: true,
        });
      });
  },
  computed: {
    ...mapGetters(["userId", "userPseudonym", "userAvatar"]),
  },
};
</script>
