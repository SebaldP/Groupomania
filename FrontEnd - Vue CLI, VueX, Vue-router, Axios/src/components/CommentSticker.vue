<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      <router-link to="/Membre/ + id"></router-link>
      {{ pseudonym }}
    </v-card-title>
    <v-card-text>
      <p v-if="FormisVisible">{{ content + ` ${convertDate(date)}` }}</p>
      <input v-else v-model="newComment" @keyup.enter="ModifyComment" />
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="user.id == authorId" @click="showModifyComment()"
        ><v-icon>settings</v-icon>Modifier</v-btn
      >
      <v-btn v-if="user.id == authorId" @click="DeleteComment()"
        ><v-icon>delete</v-icon>Supprimer</v-btn
      >
      <v-btn @click="ReportComment()"><v-icon>report</v-icon>Signaler</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

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
      const idMessages = this.messageId;
      const idComments = this.commentId;
      const comment = this.newComment;
      await axios
        .put("messages/" + idMessages + "/comment/" + idComments, {
          userId: sessionStorage.getItem("id"),
          comment: comment,
        })
        .then(() => {
          this.$router.push("/Publication/" + idMessages);
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
  async DeleteComment() {
    const idMessages = this.messageId;
    const idComments = this.commentId;
    await axios
      .delete("messages/" + idMessages + "/comment/" + idComments, {
        userId: sessionStorage.getItem("id"),
      })
      .then(() => {
        this.$router.push("/Publication/" + idMessages);
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
  async ReportComment() {
    const idMessages = this.messageId;
    const idComments = this.commentId;
    const author = `"${this.pseudonym}" (id:${this.authorId})`;
    await axios
      .post("report", {
        userId: sessionStorage.getItem("id"),
        idUsers: sessionStorage.getItem("id"),
        idMessages: idMessages,
        idComments: idComments,
        report: `Le commentaire "${idComments}" de ${author} de la publication "${idMessages}" est considéré comme indésirable!`,
      })
      .then(() => {
        this.$router.push("/Publication/" + idMessages);
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
};
</script>
