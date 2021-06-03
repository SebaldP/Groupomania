<template>
  <v-card class="pa-2" outlined tile>
    <v-card-text>
      <p>{{ `${reporter}:` + report + ` ${convertDate(date)}` }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="DeleteReport()"><v-icon>delete</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

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
      const idReports = this.reportId;
      await axios
        .delete("report/" + idReports, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          body: {
            userId: sessionStorage.getItem("id"),
          },
        })
        .then(() => {
          this.$router.push("/Admin");
        })
        .catch((error) => {
          this.$store.dispatch("message", {
            text: "",
            color: "",
            isVisible: false,
          });
          this.$store.dispatch("message", {
            text: `Erreur ${error.status} - ${error.data.error}`,
            color: "red",
            isVisible: true,
          });
        });
    },
  },
};
</script>
