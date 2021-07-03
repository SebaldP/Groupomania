<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <user-sticker
            v-for="member in members"
            :key="member.id"
            :id="member.id"
            :pseudonym="member.pseudonym"
            :avatar="member.image"
            @click.native="$router.push({ name: 'Member', params: { id: member.id } }) .catch(() => {}) "
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import UserSticker from "../components/UserSticker";

export default {
  name: "MemberList",
  components: { UserSticker },
  data: function () {
    return {
      members: [],
    };
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
          color: "error",
          isVisible: true,
        });
      });
  },
};
</script>
