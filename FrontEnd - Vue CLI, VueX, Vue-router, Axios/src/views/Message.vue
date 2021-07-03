<template>
  <v-main class="grey lighten-3">
    <v-container class="mt-5">
      <v-row>
        <v-col cols="12" sm="3">
          <v-card rounded="lg">
            <user-sticker :pseudonym="authorName" :avatar="authorAvatar" />
          </v-card>
        </v-col>

        <v-col cols="12" sm="5">
          <v-card v-show="!FormisVisible" rounded="lg">
            <v-card-title>
              {{ title }}
            </v-card-title>
            <v-card-text>
              <p>{{ content }}</p>
              <br />
              <p>{{ convertDate(date) }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="userId == authorId" @click="showModifyContent"
                ><v-icon>settings</v-icon>Modifier</v-btn
              >
              <v-btn v-if="userId == authorId || !!userIsAdmin" @click.native="DeleteComment"
                ><v-icon>delete</v-icon>Supprimer</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn @click.native="ReportComment"
                ><v-icon>report</v-icon>Signaler</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-form v-show="FormisVisible" ref="form" lazy-validation>
            <v-text-field
              v-model="newTitle"
              label="Titre de publication"
              required
            ></v-text-field>
            <v-textarea
              v-model="newContent"
              filled
              label="Contenu de publication"
              auto-grow
            ></v-textarea>
            <v-btn
              color="success"
              class="mr-4"
              @click="ModifyComment"
            >
              Mettre à jour
            </v-btn>
          </v-form>
        </v-col>

        <v-col cols="12" sm="4">
          <comment-sticker
            v-for="comm in comments"
            :key="comm.id"
            :authorId="comm.idUsers"
            :commentId="comm.id"
            :messageId="comm.idMessages"
            :pseudonym="comm.user.pseudonym"
            :content="comm.comment"
            :date="comm.updatedAt"
          />
          <v-form class="pa-2" outlined tile>
            <v-textarea
              v-model="comment"
              filled
              label="Ecrivez un commentaire"
              auto-grow
            ></v-textarea>
              <v-btn @click="CreateComment"><v-icon>done</v-icon>Envoyer</v-btn>
          </v-form>
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
  data: function () {
    return {
      messageId: null,
      authorId: null,
      authorName: "",
      authorAvatar: "",
      title: "",
      newTitle: this.title,
      content: "",
      newContent: this.content,
      date: "",
      comment: "",
      comments: [],
      FormisVisible: false
    };
  },
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
      const authOptions = {
        method: "POST",
        baseURL: "http://localhost:3000/api/",
        url: `/message/${this.messageId}/comment?g=${sessionStorage.getItem(
          "id"
        )}`,
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
    async ModifyContent() {
      const bodyContent = {
        title: this.newTitle,
        content: this.newContent,
      };
      const authOptions = {
        method: "PUT",
        baseURL: "http://localhost:3000/api/",
        url: `/message/${this.messageId}?g=${sessionStorage.getItem("id")}`,
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
    async DeleteContent() {
      const authOptions = {
        method: "DELETE",
        baseURL: "http://localhost:3000/api/",
        url: `/message/${this.messageId}?g=${sessionStorage.getItem("id")}`,
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
          this.$router.push({ path: "/" }).catch(() => {});
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
    async ReportContent() {
      const bodyContent = {
        idUsers: sessionStorage.getItem("id") || "",
        idMessages: this.$route.params.id,
        report: `La publication "${this.newTitle}" de ${this.authorName}" (id:${this.authorId}) de la publication (id:${this.$route.params.id}) est considéré comme indésirable!`,
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
  },
  async beforeCreate() {
    const authOptionsA = {
      method: "GET",
      baseURL: "http://localhost:3000/api/",
      url: `/message/${parseInt(this.$route.params.id)}?g=${sessionStorage.getItem(
        "id"
      )}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    };
    await this.$axios(authOptionsA)
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
        this.messageId = res.data.id;
        this.authorId = res.data.idUsers;
        this.title = res.data.title;
        this.content = res.data.content;
        this.date = res.data.updatedAt;
        this.authorName = res.data.User.pseudonym;
        this.authorAvatar = res.data.User.image;
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
    const authOptionsB = {
      method: "GET",
      baseURL: "http://localhost:3000/api/",
      url: `/message/${this.messageId}/comments?g=${sessionStorage.getItem(
        "id"
      )}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    await this.$axios(authOptionsB)
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
        this.comments = [...res.data];
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
  computed: {
    ...mapGetters(["userId", "userIsAdmin", "userPseudonym", "userAvatar"]),
  },
};
</script>
