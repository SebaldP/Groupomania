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
    const authOptionsA = {
      method: "GET",
      url: `http://localhost:3000/api/user/profile/${
        this.$route.params.id
      }?key=G${sessionStorage.getItem("id")}`,
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      json: true,
    };
    await this.$axios(authOptionsA)
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
        this.user = res.data.user.id;
        this.pseudonym = res.data.user.pseudonym;
        this.avatar = res.data.user.image;
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
          color: "red",
          isVisible: true,
        });
      });
    const authOptionsB = {
      method: "GET",
      url: `http://localhost:3000/api/user/profile/${
        this.$route.params.id
      }/messages?key=G${sessionStorage.getItem("id")}`,
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      json: true,
    };
    await this.$axios(authOptionsB)
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
          color: "red",
          isVisible: true,
        });
      });
  },
};
</script>
