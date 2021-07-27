<template>
  <v-main
    class="grey lighten-3"
    v-if="!!tokenSession && !!idSession && !userIsAdmin"
  >
    <v-container class="mt-5">
      <v-row>
        <v-col cols="12">
          <user-sticker
            :isModerator="!!userIsModerator"
            :isAdmin="false"
            :pseudonym="pseudonymForm"
            :avatar="avatarForm"
          />
        </v-col>
      </v-row>
      <v-row v-if="newUser">
        <v-col cols="12">
          <v-alert
            class="text-center"
            :color="userIsModerator ? 'lightblue' : 'lightred'"
            elevation="2"
            dismissible
          >
            Bienvenue aux nouveaux, sur l'application Groupomania! &#128513;<br />Nous
            vous invitons à changer votre <strong>pseudonyme</strong> (ou/et)
            votre <strong>avatar</strong> (ou/et) votre
            <strong>mot de passe</strong>.
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-if="!!userIsModerator && reports.length">
        <v-col cols="12">
          <v-alert
            v-for="report in reports"
            :key="report.id"
            class="text-center"
            color="lightyellow"
            elevation="2"
            dismissible
          >
            <v-row align="center">
              <v-col class="grow">
                {{ `${convertDate(report.updatedAt)}: ${report.report}` }}
              </v-col>
              <v-col class="shrink">
                <v-btn @click="DeleteReport(report.id)"
                  >Supprimer le signalement</v-btn
                >
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <modify-profile-form
            @avatarToParent="avatarFormChildEvent"
            @pseudonymToParent="pseudonymFormChildEvent"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-timeline v-show="!!publications.length ? true : false">
            <v-timeline-item
              v-for="publication in publications"
              :key="publication.id"
              :color="userIsModerator ? 'lightblue' : 'lightred'"
            >
              <template v-slot:icon> </template>
              <span slot="opposite">{{
                convertDate(publication.updatedAt)
              }}</span>
              <v-hover v-slot:default="{ hover }" open-delay="50">
                <v-card
                  :class="hover ? 'elevation-4' : 'elevation-2'"
                  style="cursor: pointer"
                  :color="
                    hover
                      ? userIsModerator
                        ? colorDarkBlue
                        : colorDarkRed
                      : userIsModerator
                      ? colorLightBlue
                      : colorLightRed
                  "
                  @click.native="
                    $router
                      .push({ path: `/Publication/${publication.id}` })
                      .catch(() => {})
                  "
                >
                  <v-card-title
                    class="headline"
                    :style="
                      hover
                        ? userIsModerator
                          ? { color: colorLightBlue }
                          : { color: colorLightRed }
                        : userIsModerator
                        ? { color: colorDarkBlue }
                        : { color: colorDarkRed }
                    "
                    >{{ publication.title }}</v-card-title
                  >
                </v-card>
              </v-hover>
            </v-timeline-item>
          </v-timeline>
          <v-alert
            v-show="!!publications.length ? false : true"
            class="text-center"
            :color="userIsModerator ? 'lightblue' : 'lightred'"
            elevation="2"
            dismissible
          >
            {{
              newUser
                ? "et à partager votre première publication! &#9997;"
                : "Vous n'avez rien publier !"
            }}
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

import UserSticker from "../components/UserSticker";
import ModifyProfileForm from "../components/ModifyProfileForm";

export default {
  name: "UserBoard",
  components: {
    UserSticker,
    ModifyProfileForm,
  },
  data: function () {
    return {
      reports: [],
      publications: [],
      avatarForm: this.userAvatar,
      pseudonymForm: this.userPseudonym,
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
    avatarFormChildEvent(payload) {
      this.avatarForm = payload.value;
    },
    pseudonymFormChildEvent(payload) {
      this.pseudonymForm = payload.value;
    },
    async DeleteReport(a) {
      const authOptions = {
        method: "DELETE",
        baseURL: "http://localhost:3000/api/",
        url: `/report/${a}?g=${sessionStorage.getItem("id")}`,
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
  async beforeCreate() {
    const authOptions = {
      method: "GET",
      baseURL: "http://localhost:3000/api/",
      url: `/user/profile/${sessionStorage.getItem(
        "id"
      )}/messages?g=${sessionStorage.getItem("id")}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
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
        this.publications = [...res.data];
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
    const authOptionsModerator = {
      method: "GET",
      baseURL: "http://localhost:3000/api/",
      url: `/reports?g=${sessionStorage.getItem("id")}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    await this.$axios(authOptionsModerator)
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
        this.reports = [...res.data];
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
        if (this.userIsModerator) {
          this.$store.dispatch("alertMessage", {
            text: `Erreur ${err.response.status} - ${err.response.data.alert}`,
            backgroundColor: "lightred",
            color: "darkred",
            isVisible: true,
          });
        }
      });
  },
  computed: {
    ...mapGetters([
      "tokenSession",
      "idSession",
      "userId",
      "userPseudonym",
      "userIsModerator",
      "userIsAdmin",
      "userAvatar",
      "newUser",
      "colorLightYellow",
      "colorDarkRed",
      "colorLightRed",
      "colorDarkBlue",
      "colorLightBlue",
    ]),
  },
};
</script>
