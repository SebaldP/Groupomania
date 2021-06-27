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
import messageService from "../service/messageService";

export default {
  name: "MessageForm",
  data: () => ({
    title: "",
    content: "",
  }),
  methods: {
    async createContent() {
      const bodyContent = {
        userId: sessionStorage.getItem("id") || "",
        title: this.title,
        content: this.content,
      };
      await messageService.createMessage(
        bodyContent,
        (res) => {
          this.$store.dispatch("alertMessage", {
            text: `Réponse ${res.status} - ${res.data.message}`,
            color: "green",
            isVisible: true,
          });
          this.$router.push("/Accueil");
        },
        (err) => {
          this.$store.dispatch("alertMessage", {
            text: `Erreur ${err.status} - ${err.data.err}`,
            color: "red",
            isVisible: true,
          });
        }
      );
    },
  },
};
</script>
