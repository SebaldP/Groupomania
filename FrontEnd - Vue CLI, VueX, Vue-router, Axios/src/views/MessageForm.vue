<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-form ref="form" lazy-validation>
            <v-textarea
              outlined
              auto-grow
              clearable
              clear-icon="mdi-close-circle"
              v-model="title"
              label="Titre"
              required
            ></v-textarea>
            <v-textarea
              outlined
              auto-grow
              clearable
              clear-icon="mdi-close-circle"
              v-model="content"
              label="Contenu"
              required
            ></v-textarea>
            <v-btn :color="userIsModerator || userIsAdmin ? 'lightblue' :'lightred'" @click="createContent"
              >Publier
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageForm",
  data: function () {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    async createContent() {
      const bodyContent = {
        title: this.title,
        content: this.content,
      };
      const authOptions = {
        method: "POST",
        baseURL: "http://localhost:3000/api/",
        url: `/message?g=${sessionStorage.getItem("id")}`,
        data: JSON.stringify(bodyContent),
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        json: true,
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
          this.$store.dispatch("alertMessage", {
            text: `Succès ${res.status} - ${res.data.message}`,
            backgroundColor: "lightblue",
            color: "darkblue",
            isVisible: true,
          });
          this.$router.push({ path: "/Accueil" }).catch(() => {});
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
            backgroundColor: "lightred",
            color: "darkred",
            isVisible: true,
          });
        });
    },
  },
  computed: {
    ...mapGetters([
      "userIsModerator",
      "colorLightRed",
      "colorLightBlue"
      ]),
  },
};
</script>
