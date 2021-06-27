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
import reportService from "../service/reportService";

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
      const bodyContent = {
        userId: sessionStorage.getItem("id") || "",
      };
      await reportService.deleteReport(
        this.reportId,
        bodyContent,
        (res) => {
          this.$store.dispatch("alertMessage", {
            text: `Réponse ${res.status} - ${res.data.message}`,
            color: "green",
            isVisible: true,
          });
          this.$router.push("/Admin");
        },
        (err) => {
          this.$store.dispatch("alertMessage", {
            text: `Erreur ${err.status} - ${err.data.err}`,
            color: "red",
            isVisible: true,
          });
        }
      );
    },
  },
};
</script>
