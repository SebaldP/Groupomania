<!-- OC - Project 7 - Sebald Pauer -->

<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row v-if="newUser">
        <v-col cols="12">
          <v-alert
            color="lightblue"
            elevation="2"
            dismissible
          >
            Bienvenue aux nouveaux, sur l'application Groupomania! &#128513;<br>Nous vous invitons à changer votre pseudonyme (ou/et) votre avatar (ou/et) votre mot de passe.
          </v-alert>
          <v-alert
            color="lightblue"
            elevation="2"
            dismissible
          >
            À chaque création de compte, nous vous invitons à NOTER le NUMÉRO de l'utilisat.eur.rice qui vous sera retourné! &#9997;
          </v-alert>
        </v-col>
      </v-row>
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
              v-model="moderator"
              :label="
                moderator
                  ? 'Ce sera un nouveau modérat.eur.rice!'
                  : 'Créer un modérat.eur.rice?'
              "
            ></v-checkbox>
            <v-checkbox
              v-model="Acheckbox"
              :rules="[(v) => !!v || 'Vous devez cocher pour continuer !']"
              :label="Acheckbox ? `J'approuve!` : 'Vous approuvez?'"
              required
            ></v-checkbox>
            <v-btn
              :disabled="!Avalid"
              :color="colorLightBlue"
              class="mr-4"
              @click="createUser"
            >
              Créer le compte
            </v-btn>
          </v-form>
          <!-- Formulaire 1: Création d'un compte d'utilisateur (FIN) -->
        </v-col>
        <v-col cols="12" md="4">
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
              :rules="[(v) => !!v || 'Vous devez cocher pour continuer !']"
              :label="Bcheckbox ? `J'approuve!` : 'Vous approuvez?'"
              required
            ></v-checkbox>
            <v-btn
              :disabled="!Bvalid"
              :color="colorLightBlue"
              class="mr-4"
              @click="deleteUser"
            >
              Supprimer le compte
            </v-btn>
          </v-form>
          <!-- Formulaire 2: Suppression d'un compte d'utilisateur (FIN) -->
        </v-col>
        <!-- Panneau de contrôle (FIN) -->
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

import UserSticker from "../components/UserSticker";
import ModifyProfileForm from "../components/ModifyProfileForm";

export default {
  name: "Admin",
  components: { UserSticker, ModifyProfileForm },
  data: function () {
    return {
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
      moderator: false,
      Acheckbox: false,
      Bcheckbox: false,
    };
  },
  methods: {
    async createUser() {
      if (this.Acheckbox) {
        const bodyContent = {
          registration: this.Aregistration,
          password: this.password,
          key: this.resetKey,
          isModerator: this.moderator,
        };
        const authOptions = {
          method: "POST",
          baseURL: "http://localhost:3000/api/",
          url: `/admin/user?g=${sessionStorage.getItem("id")}`,
          data: JSON.stringify(bodyContent),
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
      }
    },
    async deleteUser() {
      if (this.Bcheckbox) {
        const authOptions = {
          method: "DELETE",
          baseURL: "http://localhost:3000/api/",
          url: `/admin/user/${this.Bregistration}?g=${sessionStorage.getItem(
            "id"
          )}`,
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
      }
    },
  },
  computed: {
    ...mapGetters([
      "userId",
      "userPseudonym",
      "userAvatar",
      "newUser",
      "colorLightYellow",
      "colorLightRed",
      "colorLightBlue",
    ]),
  },
};
</script>
