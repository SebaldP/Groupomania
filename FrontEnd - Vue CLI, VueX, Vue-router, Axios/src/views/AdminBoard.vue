<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="2">
          <user-sticker :id="user" :pseudonym="pseudonym" :avatar="avatar" />
          <modify-profile-form :user="user" />
        </v-col>
        <v-col cols="12" sm="2">
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
              v-model="checkbox"
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
          <v-form ref="form" v-model="Bvalid" lazy-validation>
            <v-text-field
              v-model="Bregistration"
              :counter="10"
              :rules="registrationRules"
              label="Numéro de matricule"
              required
            ></v-text-field>

            <v-checkbox
              v-model="checkbox"
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
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import UserSticker from "../components/UserSticker";
import ModifyProfileForm from "../components/ModifyProfileForm";

export default {
  name: "AdminBoard",
  components: {
    UserSticker,
    ModifyProfileForm,
  },
  data: () => ({
    Avalid: true,
    Bvalid: true,
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
    checkbox: false,
  }),
  methods: {
    async createUser() {
      if (this.checkbox) {
        await axios
          .post("admin/user", {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: {
              userId: sessionStorage.getItem("id") || "",
              registration: this.Aregistration,
              password: this.password,
              key: this.resetKey,
            },
          })
          .then((response) => {
            console.log(response.data);
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
      }
    },
    async deleteUser() {
      if (this.checkbox) {
        await axios
          .delete("admin/user/" + this.Bregistration, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: {
              userId: sessionStorage.getItem("id") || ""
            },
          })
          .then((response) => {
            console.log(response.data);
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
      }
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
