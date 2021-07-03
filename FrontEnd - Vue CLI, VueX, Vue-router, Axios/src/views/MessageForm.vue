<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card min-height="70vh" rounded="lg">
            <v-card-title>
              <input v-model="title" />
            </v-card-title>
            <v-card-text>
              <textarea v-model="content" cols="30" rows="10"></textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn color="rgb(255, 215, 215)" @click="createContent"
                >Valider et envoyer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
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
            text: `Réponse ${res.status} - ${res.data.message}`,
            color: "success",
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
            color: "error",
            isVisible: true,
          });
        });
    },
  },
};
</script>
