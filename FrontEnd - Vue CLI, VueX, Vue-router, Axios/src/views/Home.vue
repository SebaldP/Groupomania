<template>
  <v-main>
    <v-container class="mt-5">
      <v-row>
        <!-- Bio de l'administrateur (DEBUT) -->
        <v-col cols="12" md="8">
          <welcome-user v-if="newUser" />
          <v-alert
            class="text-center"
            v-show="!!publications.length ? false : true"
            outlined
            type="warning"
            prominent
            border="left"
          >
            Aucune publication disponible !
          </v-alert>
          <router-link to="/Publier" v-if="userIsAdmin == false"
            ><i class="fas fa-plus-circle"></i
          ></router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col
        v-show="!!publications.length ? true : false"
        v-for="publication in publications"
        :key="publication.id"
        cols="auto"
        >
        <message-sticker
            :messageId="publication.id"
            :authorId="publication.idUsers"
            :title="publication.title"
            :updatedAt="publication.updatedAt"
            @click.native="
              $router
                .push({ path: `/Publication/${publication.id}` })
                .catch(() => {})
            "
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

import WelcomeUser from "../components/WelcomeUser";
import MessageSticker from "../components/MessageSticker";

export default {
  name: "Home",
  components: {
    WelcomeUser,
    MessageSticker,
  },
  data: function () {
    return {
      publications: [],
    };
  },
  async beforeCreate() {
    const authOptions = {
      method: "GET",
      baseURL: "http://localhost:3000/api/",
      url: `/messages?g=${sessionStorage.getItem("id")}`,
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
        this.publications = [...res.data];
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
    ...mapGetters([
      "newUser",
      "userId",
      "userIsAdmin",
      "userPseudonym",
      "userAvatar",
    ]),
  },
};
</script>
