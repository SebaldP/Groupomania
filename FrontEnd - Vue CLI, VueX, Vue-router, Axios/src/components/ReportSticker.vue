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
import { mapGetters } from "vuex";

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
      const authOptions = {
        method: "DELETE",
        baseURL: "http://localhost:3000/api/",
        url: `/report/${this.reportId}?g=${sessionStorage.getItem("id")}`,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
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
          this.$store.dispatch("alertMessage", {
            text: `Succès ${res.status} - ${res.data.message}`,
            backgroundColor: "lightblue",
            color: "darkblue",
            isVisible: true,
          });
          this.$router.go();
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
  },
  computed: {
    ...mapGetters(["colorLightRed", "colorLightBlue"]),
  },
};
</script>
