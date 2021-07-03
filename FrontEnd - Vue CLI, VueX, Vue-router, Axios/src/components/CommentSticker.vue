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
  data: function () {
    return {
      FormisVisible: false,
      newComment: this.content,
    };
  },
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
      const authOptions = {
        method: "PUT",
        baseURL: "http://localhost:3000/api/",
        url: `/message/${this.messageId}/comment/${
          this.commentId
        }?g=${sessionStorage.getItem("id")}`,
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
          this.$router.go();
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
  async DeleteComment() {
    const authOptions = {
      method: "DELETE",
      baseURL: "http://localhost:3000/api/",
      url: `/message/${this.messageId}/comment/${
        this.commentId
      }?g=${sessionStorage.getItem("id")}`,
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
        this.$router.go();
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
  async ReportComment() {
    const bodyContent = {
      idUsers: sessionStorage.getItem("id") || "",
      idMessages: this.messageId,
      idComments: this.commentId,
      report: `Le commentaire (id:${this.commentId}) de "${this.pseudonym}" (id:${this.authorId}) de la publication (id:${this.messageId}) est considéré comme indésirable!`,
    };
    const authOptions = {
      method: "POST",
      baseURL: "http://localhost:3000/api/",
      url: `/report?g=${sessionStorage.getItem("id")}`,
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
        this.$router.go();
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
};
</script>
