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
            @click="Pathto(member.id)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import userService from "../service/userService";

export default {
  name: "MemberList",
  data: () => ({
    members: {},
  }),
  methods: {
    Pathto(userId) {
      this.$router.push({ name: "Membre", params: { id: userId } });
    },
  },
  async beforeCreate() {
    const bodyContent = {
      userId: sessionStorage.getItem("id") || "",
    };
    await userService.getAllProfiles(
      this.$route.params.id,
      bodyContent,
      (res) => {
        this.$store.dispatch("alertMessage", {
          text: `Réponse ${res.status} - ${res.data.message}`,
          color: "green",
          isVisible: true,
        });
        this.members = res.data;
      },
      (err) => {
        this.$store.dispatch("alertMessage", {
          text: `Erreur ${err.status} - ${err.data.error}`,
          color: "red",
          isVisible: true,
        });
      }
    );
  },
};
</script>
