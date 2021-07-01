<template>
  <v-card class="grey lighten-3 pa-2" outlined tile>
    <v-card-title>
      <router-link to="/Membre/ + id"></router-link>
      {{ pseudonym }}
    </v-card-title>
    <v-card-text>
      <p v-if="FormisVisible">{{ `${content} (${convertDate(date)})` }}</p>
      <input v-else v-model="newComment" @keyup.enter="ModifyComment" />
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="sessionStorage.getItem('id') == authorId"
        @click="showModifyComment()"
        ><v-icon>settings</v-icon>Modifier</v-btn
      >
      <v-btn
        v-if="sessionStorage.getItem('id') == authorId"
        @click="DeleteComment()"
        ><v-icon>delete</v-icon>Supprimer</v-btn
      >
      <v-btn @click="ReportComment()"><v-icon>report</v-icon>Signaler</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CommentSticker",
  props: {
    authorId: Number,
    messageId: Number,
    commentId: Number,
    pseudonym: String,
    date: String,
    content: String,
  },
  data: () => ({
    FormisVisible: false,
    newComment: this.content,
  }),
  methods: {
    convertDate(a) {
      return a.toLocaleDateString("en-US");
    },
    showModifyComment() {
      return (this.FormisVisible = !this.FormisVisible);
    },
    async ModifyComment() {
      const bodyContent = {
      comment: this.newComment,
    };
    
      await this.$axios
        .put(
          `http://localhost:3000/api/messages/${this.messageId}/comment/${this.commentId}?userId=${sessionStorage.getItem("id")}`, bodyContent,)
        .then((res) => {
          console.log(res.data);
          this.$store.dispatch("alertMessage", {
            text: `Réponse ${res.status} - ${res.data.message}`,
            color: "green",
            isVisible: true,
          });
          this.$router.go();
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
  async DeleteComment() {
    
    await this.$axios
      .delete(
        `http://localhost:3000/api/messages/${this.messageId}/comment/${this.commentId}?userId=${sessionStorage.getItem("id")}`,)
      .then((res) => {
        console.log(res.data);
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
        this.$router.go();
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
  async ReportComment() {
    const bodyContent = {
      idUsers: sessionStorage.getItem("id") || "",
      idMessages: this.messageId,
      idComments: this.commentId,
      report: `Le commentaire (id:${this.commentId}) de "${this.pseudonym}" (id:${this.authorId}) de la publication (id:${this.messageId}) est considéré comme indésirable!`,
    };
    
    await this.$axios
      .post(`http://localhost:3000/api/report?userId=${sessionStorage.getItem("id")}`, bodyContent,)
      .then((res) => {
        console.log(res.data);
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
        this.$router.go();
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
