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
  data: () => ({
    title: "",
    content: "",
  }),
  methods: {
    async createContent() {
      const bodyContent = {
        title: this.title,
        content: this.content,
      };
      await this.$axios
        .post(`http://localhost:3000/api/messages?userId=${sessionStorage.getItem("id")}`, bodyContent,)
        .then((res) => {
          console.log(res.data);
          this.$store.dispatch("alertMessage", {
            text: `Réponse ${res.status} - ${res.data.message}`,
            color: "green",
            isVisible: true,
          });
          this.$router.push({ path: "/Accueil" });
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
  },
};
</script>
