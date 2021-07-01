<template>
  <v-card class="pa-2" outlined tile>
    <v-card-text>
      <p>{{ `${convertDate(date)}: ${report}` }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="DeleteReport"><v-icon>delete</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ReportSticker",
  props: {
    reportId: Number,
    report: String,
    date: String,
  },
  methods: {
    convertDate(a) {
      return a.toLocaleDateString("en-US");
    },
    async DeleteReport() {
      
      await this.$axios
        .delete(
          `http://localhost:3000/api/admin/user/${this.reportId}?userId=${sessionStorage.getItem("id")}`,)
        .then((res) => {
          console.log(res.data);
          this.$store.dispatch("alertMessage", {
            text: `Réponse ${res.status} - ${res.data.message}`,
            color: "green",
            isVisible: true,
          });
          this.$router.go();
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
  },
};
</script>
