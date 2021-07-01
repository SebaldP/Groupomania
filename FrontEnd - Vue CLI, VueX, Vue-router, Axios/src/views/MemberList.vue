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
    
    await this.$axios
      .get(`http://localhost:3000/api/user?userId=${sessionStorage.getItem("id")}`,)
      .then((res) => {
        console.log(res.data);
        Object.assign(this.members, JSON.parse(res.data));
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.error);
        this.$store.dispatch("alertMessage", {
          text: `Erreur ${err.status} - ${err.alert}`,
          color: "red",
          isVisible: true,
        });
      });
  },
};
</script>
