<template>
  <v-main class="grey lighten-3">
    <v-container class="mt-5">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-list v-show="!!members.length ? true : false">
              <v-list-item
                v-for="member in members"
                :key="member.id"
                class="py-3"
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
                  ></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon
                    v-show="userId == member.id"
                    :color="!!member.isModerator ? colorDarkBlue : colorDarkRed"
                    class="ml-2"
                    >account_circle</v-icon
                  >
                  <v-icon
                    :color="!!member.isModerator ? colorDarkBlue : colorDarkRed"
                    >face</v-icon
                  >
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
          <v-alert
            class="text-center"
            v-show="!!members.length ? false : true"
            :color="colorLightYellow"
            border="left"
            elevation="2"
            colored-border
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
