<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      <router-link to="/Membre/ + id"></router-link>
      {{ pseudonym }}
    </v-card-title>
    <v-card-text>
      <p v-if="FormisVisible">{{`${content} (${convertDate(date)})`}}</p>
      <input v-else v-model="newComment" @keyup.enter="ModifyComment" />
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="sessionStorage.getItem('id') == authorId" @click="showModifyComment()"
        ><v-icon>settings</v-icon>Modifier</v-btn
      >
      <v-btn v-if="sessionStorage.getItem('id') == authorId" @click="DeleteComment()"
        ><v-icon>delete</v-icon>Supprimer</v-btn
      >
      <v-btn @click="ReportComment()"><v-icon>report</v-icon>Signaler</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import commentService from "../service/commentService";
import reportService from "../service/reportService";

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
        userId: sessionStorage.getItem("id") || "",
        comment: this.newComment,
      };
      await commentService.modifyComment(
        this.messageId,
        this.commentId,
        bodyContent,
        (res) => {
          this.$store.dispatch("alertMessage", {
            text: `Réponse ${res.status} - ${res.data.message}`,
            color: "green",
            isVisible: true,
          });
          this.$router.push("/Publication/" + this.messageId);
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
  async DeleteComment() {
    const bodyContent = {
      userId: sessionStorage.getItem("id") || "",
    };
    await commentService.deleteComment(
      this.messageId,
      this.commentId,
      bodyContent,
      (res) => {
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
        this.$router.push("/Publication/" + this.messageId);
      },
      (err) => {
        this.$store.dispatch("alertMessage", {
          text: `Erreur ${err.status} - ${err.data.error}`,
          color: "red",
          isVisible: true,
        });
      }
    );
  },
  async ReportComment() {
    const bodyContent = {
      userId: sessionStorage.getItem("id") || "",
      idUsers: sessionStorage.getItem("id") || "",
      idMessages: this.messageId,
      idComments: this.commentId,
      report: `Le commentaire (id:${this.commentId}) de "${this.pseudonym}" (id:${this.authorId}) de la publication (id:${this.messageId}) est considéré comme indésirable!`,
    };
    await reportService.createReport(
      bodyContent,
      (res) => {
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
        this.$router.push("/Publication/" + this.messageId);
      },
      (err) => {
        this.$store.dispatch("alertMessage", {
          text: `Erreur ${err.status} - ${err.data.error}`,
          color: "red",
          isVisible: true,
        });
      }
    );
  }
};
</script>
