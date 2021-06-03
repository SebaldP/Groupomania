<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="registration"
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

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="createUser">
      Créer
    </v-btn>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    registration: "",
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
            userId: sessionStorage.getItem("id") || "",
            registration: this.registration,
            password: this.password,
            resetKey: this.resetKey,
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
  },
};
</script>
