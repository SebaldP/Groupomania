<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
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

        <v-col cols="12" sm="2">
          <comment-sticker
            :for="comm in comms"
            :key="comm.id"
            :authorId="comm.idUsers"
            :commentId="comm.id"
            :messageId="comm.idMessages"
            :pseudonym="comm.user.pseudonym"
            :content="comm.comment"
            :date="comm.updatedAt"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "MessageForm",
  data: () => ({
    title: "",
    content: "",
  }),
  methods: {
    async createContent() {
      const title = this.title;
      const content = this.content;
      await axios
        .post("/messages/", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          body: {
            userId: sessionStorage.getItem("id"),
            title: title,
            content: content,
          },
        })
        .then(() => {
          this.$router.push("/Accueil");
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
  },
};
</script>
