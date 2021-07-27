<template>
  <v-main class="grey lighten-3" v-if="!!tokenSession && !!idSession">
    <v-container class="mt-5">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-list v-show="!!members.length ? true : false">
              <v-hover
                v-for="member in members"
                :key="member.id"
                v-slot:default="{ hover }"
                open-delay="50"
              >
                <v-list-item
                  :style="
                    hover
                      ? !!member.isModerator
                        ? `background: ${colorDarkBlue};`
                        : `background: ${colorDarkRed};`
                      : !!member.isModerator
                      ? `background: ${colorLightBlue};`
                      : `background: ${colorLightRed};`
                  "
                  class="py-3"
                  style="cursor: pointer"
                  @click.native="
                    $router
                      .push({ name: 'Member', params: { id: member.id } })
                      .catch(() => {})
                  "
                >
                  <v-list-item-avatar>
                    <v-img :src="getImgUrl(member.avatar)"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="member.pseudonym"
                      :style="
                        hover
                          ? !!member.isModerator
                            ? `color: ${colorLightBlue};`
                            : `color: ${colorLightRed};`
                          : `color: black;`
                      "
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="
                        !!member.Messages.length
                          ? 'Dernière publication: ' +
                            getEvenDaysDiff(member.Messages[0].updatedAt)
                          : 'Aucune publication pour le moment.'
                      "
                      :style="
                        hover
                          ? !!member.isModerator
                            ? `color: ${colorLightBlue};`
                            : `color: ${colorLightRed};`
                          : `color: black;`
                      "
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon
                      v-show="userId == member.id"
                      :color="
                        hover
                          ? !!member.isModerator
                            ? colorLightBlue
                            : colorLightRed
                          : 'black'
                      "
                      class="ml-2"
                      >account_circle</v-icon
                    >
                  </v-list-item-icon>
                </v-list-item>
              </v-hover>
            </v-list>
          </v-card>
          <v-alert
            class="text-center"
            v-show="!!members.length ? false : true"
            :color="userIsModerator || userIsAdmin ? 'lightblue' : 'lightred'"
            elevation="2"
            dismissible
          >
            Aucun membre existant !
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MemberList",
  data: function () {
    return {
      members: [],
    };
  },
  methods: {
    getImgUrl(a) {
      return require(`@/assets/images/${a}`);
    },
    getEvenDaysDiff(d) {
      let now = new Date();
      now.setHours(0, 0, 0, 0);
      let then = new Date(d);
      then.setHours(0, 0, 0, 0);
      let result = Math.round((now - then) / 8.64e7);
      if (result < 1) {
        return "aujourd'hui.";
      } else if (result >= 1 && result < 2) {
        return "hier.";
      } else if (result >= 2 && result < 3) {
        return "avant-hier.";
      } else {
        return "il y a " + result + " jours.";
      }
    },
  },
  async beforeCreate() {
    const authOptions = {
      method: "GET",
      baseURL: "http://localhost:3000/api/",
      url: `/user/profiles?g=${sessionStorage.getItem("id")}`,
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
        this.members = [...res.data];
        console.log(this.members);
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
      "userIsAdmin",
      "userIsModerator",
      "tokenSession",
      "idSession",
      "userId",
      "colorLightYellow",
      "colorDarkRed",
      "colorLightRed",
      "colorDarkBlue",
      "colorLightBlue",
    ]),
  },
};
</script>
