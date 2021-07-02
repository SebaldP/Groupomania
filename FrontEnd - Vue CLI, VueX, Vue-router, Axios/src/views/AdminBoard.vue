<!-- OC - Project 7 - Sebald Pauer -->

<template>
  <v-main class="grey lighten-3" v-if="userIsAdmin">
    <v-container>
      <v-row>
        <!-- Bio de l'administrateur (DEBUT) -->
        <v-col cols="12" md="4">
          <user-sticker
            :id="userId"
            :pseudonym="userPseudonym"
            :avatar="userAvatar"
          />
          <modify-profile-form
            :pseudonym="userPseudonym"
            :avatar="userAvatar"
          />
        </v-col>
        <!-- Bio de l'administrateur (FIN) -->
        <!-- Panneau de contrôle (DEBUT) -->
        <v-col cols="12" md="4">
          <!-- Formulaire 1: Création d'un compte d'utilisateur (DEBUT) -->
          <v-form ref="form" v-model="Avalid" lazy-validation>
            <v-text-field
              v-model="Aregistration"
              :counter="10"
              :rules="registrationRules"
              label="Numéro de matricule"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Mot de passe"
              required
            ></v-text-field>
            <v-text-field
              v-model="resetKey"
              :rules="resetKeyRules"
              label="Clé de réinitialisation"
              required
            ></v-text-field>
            <v-checkbox
              v-model="Acheckbox"
              :rules="[(v) => !!v || 'Tu dois valider pour continuer !']"
              label="Valides-tu?"
              required
            ></v-checkbox>
            <v-btn
              :disabled="!Avalid"
              color="success"
              class="mr-4"
              @click="createUser"
            >
              Créer
            </v-btn>
          </v-form>
          <!-- Formulaire 1: Création d'un compte d'utilisateur (FIN) -->
          <!-- Formulaire 2: Suppression d'un compte d'utilisateur (DEBUT) -->
          <v-form ref="form" v-model="Bvalid" lazy-validation>
            <v-text-field
              v-model="Bregistration"
              :counter="10"
              :rules="registrationRules"
              label="Numéro de matricule"
              required
            ></v-text-field>
            <v-checkbox
              v-model="Bcheckbox"
              :rules="[(v) => !!v || 'Tu dois valider pour continuer !']"
              label="Valides-tu?"
              required
            ></v-checkbox>
            <v-btn
              :disabled="!Bvalid"
              color="success"
              class="mr-4"
              @click="deleteUser"
            >
              Créer
            </v-btn>
          </v-form>
          <!-- Formulaire 2: Suppression d'un compte d'utilisateur (FIN) -->
        </v-col>
        <v-col cols="12" md="4">
          <report-sticker
            v-show="!!reports.length ? true : false"
            v-for="report in reports"
            :key="report.id"
            :report="report.report"
            :reportId="report.id"
            :date="report.updatedAt"
          />
          <v-alert v-show="!!reports.length ? false : true" dense outlined>
            Aucun signalement à annoncer !
          </v-alert>
          />
        </v-col>
        <!-- Panneau de contrôle (FIN) -->
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

import UserSticker from "../components/UserSticker";
import ReportSticker from "../components/ReportSticker";
import ModifyProfileForm from "../components/ModifyProfileForm";

export default {
  name: "AdminBoard",
  components: { UserSticker, ReportSticker, ModifyProfileForm },
  data: () => ({
    reports: {},
    Avalid: false,
    Bvalid: false,
    Aregistration: "",
    Bregistration: "",
    registrationRules: [
      (v) => !!v || "Numéro de matricule requis",
      (v) =>
        /^G\d{3}[A-Z]{2}\d{3}\D{1}$/.test(v) ||
        "Numéro de matricule non valide !",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Mot de passe requis",
      (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()'"`~,;:.<>\s])(?=.{8,})/.test(
          v
        ) ||
        "Mot de passe non valide ! Minimum (8 caractères): 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!?@#%&*€¤) !",
    ],
    resetKey: "",
    resetKeyRules: [
      (v) => !!v || "Clé de réinitialisation requise",
      (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()'"`~,;:.<>\s])(?=.{8,})/.test(
          v
        ) ||
        "Clé de réinitialisation non valide ! Minimum (8 caractères): 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!?@#%&*€¤) !",
    ],
    Acheckbox: false,
    Bcheckbox: false,
  }),
  methods: {
    async createUser() {
      if (this.Acheckbox) {
        const bodyContent = {
          registration: this.Aregistration,
          password: this.password,
          key: this.resetKey,
        };
        const authOptions = {
          method: "POST",
          url: `http://localhost:3000/api/admin/user?key=G${sessionStorage.getItem(
            "id"
          )}`,
          data: JSON.stringify(bodyContent),
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
            this.$store.dispatch("alertMessage", {
              text: `Réponse ${res.status} - ${res.data.message}`,
              color: "green",
              isVisible: true,
            });
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
      }
    },
    async deleteUser() {
      if (this.Bcheckbox) {
        const authOptions = {
          method: "DELETE",
          url: `http://localhost:3000/api/admin/user/${
            this.Bregistration
          }?key=G${sessionStorage.getItem("id")}`,
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
            this.$store.dispatch("alertMessage", {
              text: `Réponse ${res.status} - ${res.data.message}`,
              color: "green",
              isVisible: true,
            });
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
      }
    },
  },
  computed: {
    ...mapGetters(["userId", "userIsAdmin", "userPseudonym", "userAvatar"]),
  },
  async beforeCreate() {
    const authOptions = {
      method: "GET",
      url: `http://localhost:3000/api/reports?key=G${sessionStorage.getItem(
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
        Object.assign(this.reports, JSON.parse(res.data));
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
