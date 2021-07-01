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
            @click="
              this.$router.push({ path: `/Publication/${publication.id}` })
            "
          />
          <v-alert v-show="publications ? false : true" dense outlined>
            Aucune publication disponible !
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
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
    
    await this.$axios
      .get(
        `http://localhost:3000/api/user/profile/${this.$route.params.id}?userId=${sessionStorage.getItem("id")}`,
       )
      .then((res) => {
        console.log(res.data);
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
        this.user = res.data.id;
        this.pseudonym = res.data.pseudonym;
        this.avatar = res.data.image;
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
    await this.$axios
      .get(
        `http://localhost:3000/api/user/profile/${this.$route.params.id}/messages?userId=${sessionStorage.getItem("id")}`,
       )
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
};
</script>
