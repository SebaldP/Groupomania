<template>
  <v-main class="grey lighten-3 pb-2" v-if="!!tokenSession && !!idSession">
    <v-container
      class="mt-5"
      :style="!userIsAdmin ? { position: relative } : {}"
    >
      <v-row>
        <v-col cols="12" v-show="!!publications.length ? true : false">
          <v-timeline>
            <v-timeline-item
              v-for="publication in publications"
              :key="publication.id"
            >
              <template v-slot:icon>
                <v-avatar>
                  <img :src="getImgUrl(publication.User.avatar)" />
                </v-avatar>
              </template>
              <span slot="opposite">{{
                convertDate(publication.updatedAt)
              }}</span>
              <v-hover v-slot:default="{ hover }" open-delay="50">
                <v-card
                  :class="hover ? 'elevation-4' : 'elevation-2'"
                  style="cursor: pointer"
                  :color="
                    hover
                      ? publication.User.isModerator
                        ? colorDarkBlue
                        : colorDarkRed
                      : publication.User.isModerator
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
                        ? publication.User.isModerator
                          ? { color: colorLightBlue }
                          : { color: colorLightRed }
                        : publication.User.isModerator
                        ? { color: colorDarkBlue }
                        : { color: colorDarkRed }
                    "
                    >{{ publication.title }}</v-card-title
                  >
                  <v-card-subtitle>
                    {{ "par " + publication.User.pseudonym }}
                  </v-card-subtitle>
                </v-card>
              </v-hover>
            </v-timeline-item>
          </v-timeline>
        </v-col>
        <v-col cols="12" v-show="!!publications.length ? false : true">
          <v-alert
            class="text-center"
            :color="userIsModerator || userIsAdmin ? 'lightblue' : 'lightred'"
            elevation="2"
            dismissible
          >
            Aucune publication pour le moment !
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      v-if="!userIsAdmin"
      :color="userIsModerator ? 'darkblue' : 'darkred'"
      style="bottom: 1rem"
      dark
      absolute
      right
      fab
      x-large
      to="/Publier"
    >
      <v-icon :color="userIsModerator ? 'lightblue' : 'lightred'"
        >mdi-plus</v-icon
      >
    </v-btn>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data: function () {
    return {
      publications: [],
    };
  },
  methods: {
    getImgUrl(a) {
      return require(`@/assets/images/${a}`);
    },
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
      url: `/messages?g=${sessionStorage.getItem("id")}`,
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
  },
  computed: {
    ...mapGetters([
      "tokenSession",
      "idSession",
      "userId",
      "userIsAdmin",
      "userIsModerator",
      "userPseudonym",
      "userAvatar",
      "colorLightYellow",
      "colorDarkRed",
      "colorLightRed",
      "colorDarkBlue",
      "colorLightBlue",
    ]),
  },
};
</script>
