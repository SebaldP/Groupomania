<template>
  <v-main class="grey lighten-3">
    <v-container class="mt-5">
      <v-row v-if="newUser">
        <v-col cols="12">
          <v-alert
            :color="userIsModerator ? 'lightblue' :'lightred'"
            elevation="2"
            dismissible
          >
            Bienvenue aux nouveaux, sur l'application Groupomania! &#128513;<br>Nous vous invitons à changer votre pseudonyme (ou/et) votre avatar (ou/et) votre mot de passe.
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-if="!!userIsModerator && !reports.length">
        <v-col cols="12">
          <report-sticker
            v-for="report in reports"
            :key="report.id"
            :report="report.report"
            :reportId="report.id"
            :date="report.updatedAt"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <user-sticker
            :id="userId"
            :pseudonym="userPseudonym"
            :avatar="userAvatar"
          />
          <modify-profile-form
            :pseudonym="userPseudonym"
            :avatar="userAvatar"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-card
            v-show="!!publications.length ? true : false"
            v-for="publication in publications"
            :key="publication.id"
            class="mx-auto"
            :color="userIsModerator ? colorLightBlue : colorLightRed"
            dark
            max-width="400"
            @click.native="
              $router
                .push({ path: `/Publication/${publication.id}` })
                .catch(() => {})
            "
          >
            <v-card-title
              class="text-h5 font-weight-bold"
              :style="
                userIsModerator
                  ? { color: colorDarkBlue }
                  : { color: colorDarkRed }
              "
            >
              {{ publication.title }}
            </v-card-title>
            <v-card-actions>
              <v-list-item class="grow">
                <v-row align="center" justify="end">
                  <span
                    class="subheading mr-2"
                    :style="
                      userIsModerator
                        ? { color: colorDarkBlue }
                        : { color: colorDarkRed }
                    "
                    >{{ convertDate(publication.updatedAt) }}</span
                  >
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
          <v-alert
            v-show="!!publications.length ? false : true"
            :color="userIsModerator?'lightblue':'lightred'"
            elevation="2"
            dismissible
          >
            {{newUser ? "et à partager votre première publication! &#9997;" : "Vous n'avez rien publier !"}}
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
import ReportSticker from "../components/ReportSticker";

export default {
  name: "UserBoard",
  components: {
    UserSticker,
    ReportSticker,
    ModifyProfileForm,
  },
  data: function () {
    return {
      reports: [],
      publications: [],
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
      "userId",
      "userPseudonym",
      "userIsModerator",
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
