<template>
  <v-main>
    <welcome-user v-if="newUser" />
    <message-sticker
      v-show="!!publications.length ? true : false"
      v-for="publication in publications"
      :key="publication.id"
      :messageId="publication.id"
      :authorId="publication.idUsers"
      :title="publication.title"
      :updatedAt="publication.updatedAt"
      @click="this.$router.push({ path: `/Publication/${publication.id}` })"
    />
    <v-alert v-show="!!publications.length ? false : true" dense outlined>
      Aucune publication disponible !
    </v-alert>
    <router-link to="/Publier" v-if="userIsAdmin == false"
      ><i class="fas fa-plus-circle"></i
    ></router-link>
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
  data: () => ({
    publications: {},
  }),
  async beforeCreate() {
    
    await this.$axios
      .get(`http://localhost:3000/api/messages?userId=${sessionStorage.getItem("id")}`,)
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
