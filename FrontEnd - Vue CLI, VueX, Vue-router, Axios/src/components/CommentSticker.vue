<template>
  <v-card class="grey lighten-3 pa-2" outlined tile>
    <v-card-title>
      <router-link :to="'/Membre/' + authorId"></router-link>
      {{ pseudonym }}
    </v-card-title>
    <v-card-text>
      <p v-if="!FormisVisible">{{ `${content} (${convertDate(date)})` }}</p>
      <v-textarea
        v-else
        solo
        clearable
        clear-icon="mdi-close-circle"
        label="Vous pouvez changer votre commentaire!"
        v-model="newComment"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="FormisVisible" @click="ModifyComment()">Mettre à jour</v-btn>
      <v-btn v-if="userId == authorId" @click="displayForm()"
        ><v-icon v-show="!FormisVisible">settings</v-icon
        >{{ !FormisVisible ? "Modifier" : "Annuler" }}</v-btn
      >
      <v-btn
        v-if="
          (!FormisVisible && userId == authorId) ||
          !!userIsAdmin ||
          !!userIsModerator
        "
        @click="DeleteComment()"
        ><v-icon>delete</v-icon>Supprimer</v-btn
      >
      <v-btn @click="ReportComment()"><v-icon>report</v-icon>Signaler</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CommentSticker",
  props: {
    authorId: Number,
    commentId: Number,
    pseudonym: String,
    avater: String,
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
      return new Date(a).toLocaleDateString("en-US");
    },
    displayForm() {
      return (this.FormisVisible = !this.FormisVisible);
    },
    async ModifyComment() {
      const bodyContent = {
        comment: this.newComment,
      };
      const authOptions = {
        method: "PUT",
        baseURL: "http://localhost:3000/api/",
        url: `/message/${this.$route.params.id}/comment/${
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
            text: `Succès ${res.status} - ${res.data.message}`,
            backgroundColor: "lightblue",
            color: "darkblue",
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
            backgroundColor: "lightred",
            color: "darkred",
            isVisible: true,
          });
        });
    },
  },
  async DeleteComment() {
    const authOptions = {
      method: "DELETE",
      baseURL: "http://localhost:3000/api/",
      url: `/message/${this.$route.params.id}/comment/${
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
          text: `Succès ${res.status} - ${res.data.message}`,
          backgroundColor: "lightblue",
          color: "darkblue",
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
          backgroundColor: "lightred",
          color: "darkred",
          isVisible: true,
        });
      });
  },
  async ReportComment() {
    const bodyContent = {
      idUsers: sessionStorage.getItem("id") || "",
      idMessages: this.$route.params.id,
      idComments: this.commentId,
      report: `Le commentaire (id:${this.commentId}) de "${this.pseudonym}" (id:${this.authorId}) de la publication (id:${this.$route.params.id}) est considéré comme indésirable!`,
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
          text: `Succès ${res.status} - ${res.data.message}`,
          backgroundColor: "lightblue",
          color: "darkblue",
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
          backgroundColor: "lightred",
          color: "darkred",
          isVisible: true,
        });
      });
  },
  computed: {
    ...mapGetters([
      "userId",
      "userIsAdmin",
      "userIsModerator",
      "userPseudonym",
      "userAvatar",
      "colorLightRed",
      "colorLightBlue",
    ]),
  },
};
</script>
