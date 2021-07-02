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
            :to="
              this.$router.push({ name: 'Membre', params: { id: member.id } })
            "
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "MemberList",
  data: () => ({
    members: {},
  }),
  async beforeCreate() {
    const authOptions = {
      method: "GET",
      url: `http://localhost:3000/api/user/profiles?key=G${sessionStorage.getItem(
        "id"
      )}`,
      headers: {
        Authorization: sessionStorage.getItem("token"),
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
        Object.assign(this.members, JSON.parse(res.data));
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
          color: "red",
          isVisible: true,
        });
      });
  },
};
</script>
