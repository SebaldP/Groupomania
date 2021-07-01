<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="2">
          <v-card rounded="lg" min-height="268">
            <user-sticker :pseudonym="authorName" :avatar="authorAvatar" />
          </v-card>
        </v-col>

        <v-col cols="12" sm="8">
          <v-card min-height="70vh" rounded="lg">
            <v-card-title>
              <h1 v-if="FormisVisible">{{ title }}</h1>
              <input v-else v-model="newTitle" @keyup.enter="ModifyComment" />
            </v-card-title>
            <v-card-text>
              <p v-if="FormisVisible">{{ content }}</p>
              <textarea
                v-else
                v-model="newContent"
                cols="30"
                rows="10"
                @keyup.enter="ModifyComment"
              ></textarea>
              <br />
              <p>{{ convertDate(date) }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn><v-icon>add_comment</v-icon>Ajouter un commentaire</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-if="userId == authorId" @click="showModifyComment()"
                ><v-icon>settings</v-icon>Modifier</v-btn
              >
              <v-btn v-if="userId == authorId" @click="DeleteComment()"
                ><v-icon>delete</v-icon>Supprimer</v-btn
              >
              <v-btn @click="ReportComment()"
                ><v-icon>report</v-icon>Signaler</v-btn
              >
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
          <v-card class="pa-2" outlined tile>
            <v-card-title> Nouveau commentaire </v-card-title>
            <v-card-text>
              <input v-model="comment" />
            </v-card-text>
            <v-card-actions>
              <v-btn @click="CreateComment"><v-icon>done</v-icon>Envoyer</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

import UserSticker from "../components/UserSticker";
import CommentSticker from "../components/CommentSticker";

export default {
  name: "Message",
  components: {
    UserSticker,
    CommentSticker,
  },
  data: () => ({
    messageId: this.$route.params.id,
    authorId: "",
    authorName: "",
    authorAvatar: "",
    title: "",
    newTitle: this.title,
    content: "",
    newContent: this.content,
    date: "",
    comment: "",
    comments: {},
    FormisVisible: false,
  }),
  methods: {
    convertDate(a) {
      const A = new Date(a);
      const opt_weekday = { weekday: "long" };
      const weekday = toTitleCase(A.toLocaleDateString("fr-FR", opt_weekday));
      const options = { year: "numeric", month: "long", day: "numeric" };
      function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
      return weekday + ", " + A.toLocaleDateString("fr-FR", options);
    },
    showModifyContent() {
      return (this.FormisVisible = !this.FormisVisible);
    },
    async CreateComment() {
      const bodyContent = {
        comment: this.comment,
      };
      
      await this.$axios
        .post(
          `http://localhost:3000/api/messages/${this.messageId}/comment?userId=${sessionStorage.getItem("id")}`, bodyContent,)
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
    async ModifyContent() {
      const bodyContent = {
        title: this.newTitle,
        content: this.newContent,
      };
      
      await this.$axios
        .put(
          `http://localhost:3000/api/messages/${this.messageId}?userId=${sessionStorage.getItem("id")}`, bodyContent,)
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
    async DeleteContent() {
     
      await this.$axios
        .delete(
          `http://localhost:3000/api/messages/${this.messageId}?userId=${sessionStorage.getItem("id")}`,)
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
    async ReportContent() {
      const bodyContent = {
        idUsers: sessionStorage.getItem("id") || "",
        idMessages: this.$route.params.id,
        report: `La publication "${this.newTitle}" de ${this.authorName}" (id:${this.authorId}) de la publication (id:${this.$route.params.id}) est considéré comme indésirable!`,
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
  },
  async beforeCreate() {
    
    await this.$axios
      .get(
        `http://localhost:3000/api/messages/${this.$route.params.id}?userId=${sessionStorage.getItem("id")}`,)
      .then((res) => {
        console.log(res.data);
        this.authorId = res.data.idUsers;
        this.title = res.data.title;
        this.content = res.data.content;
        this.date = res.data.updatedAt;
        this.authorName = res.data.user.pseudonym;
        this.authorAvatar = res.data.user.image;
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
        `http://localhost:3000/api/messages/${this.messageId}/comments?userId=${sessionStorage.getItem("id")}`,)
      .then((res) => {
        console.log(res.data);
        Object.assign(this.comments, JSON.parse(res.data));
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
  computed: {
    ...mapGetters(["userId", "userIsAdmin", "userPseudonym", "userAvatar"]),
  },
};
</script>
