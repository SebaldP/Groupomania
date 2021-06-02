<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="newPseudonym"
      :rules="pseudonymRules"
      label="Pseudonyme"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[(v) => !!v || `L'avatar est requis !`]"
      label="Avatar"
      required
    ></v-select>

    <v-text-field
      v-model="newPassword"
      :rules="passwordRules"
      label="Mot de passe"
      required
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword"
      :rules="passwordRules"
      label="Confirmez le mot de passe"
      :required="newPassword ? true : false"
    ></v-text-field>

    <v-avatar v-if="select">
      <img :src="user.image" :alt="`Possible avatar de ${newPseudonym}`" />
    </v-avatar>

    <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'Tu dois valider pour continuer !']"
      label="Valides-tu?"
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Mettre à jour
    </v-btn>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "ModifyProfileForm",
  data: () => ({
    newPseudonym: this.user.pseudonym,
    pseudonymRules: [(v) => !!v || "Le pseudonyme de requis !"],
    newPassword: "",
    confirmPassword: "",
    passwordRules: [
      (v) => !!v || "Mot de passe requis",
      (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()'"`~,;:.<>\s])(?=.{8,})/.test(
          v
        ) ||
        "Mot de passe non valide ! Minimum (8 caractères): 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!?@#%&*€¤) !",
    ],
    valid: true,
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),
  props: {
    user: Object,
  },
  watch: {
    avatar() {
      return `../assets/avatar/${this.select}.png`;
    },
  },
  methods: {
    validate() {
      if (
        !this.newPassword == null &&
        !this.confirmPassword == null &&
        this.newPassword === this.confirmPassword
      ) {
        axios
          .put("user/profile/" + sessionStorage.getItem("id"), {
            userId: sessionStorage.getItem("id") || "",
            pseudonym: this.newPseudonym,
            image: `../assets/avatar/${this.select}.png`,
            password: this.newPassword,
          })
          .then((response) => {
            console.log(response.data);
            this.$store.dispatch("user", response.data.user);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("id", response.data.user.userId);
            this.$router.push("/Accueil");
          })
          .catch((error) => {
            this.forgetPassword();
            this.$store.dispatch("message", null);
            this.$store.dispatch(
              "message",
              `Erreur ${error.status} - ${error.data.error}`
            );
          });
      } else {
        axios
          .put("user/profile/" + sessionStorage.getItem("id"), {
            userId: sessionStorage.getItem("id") || "",
            pseudonym: this.newPseudonym,
            image: `../assets/avatar/${this.select}.png`,
          })
          .then((response) => {
            console.log(response.data);
            this.$store.dispatch("user", response.data.user);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("id", response.data.user.userId);
            this.$router.push("/Accueil");
          })
          .catch((error) => {
            this.forgetPassword();
            this.$store.dispatch("message", null);
            this.$store.dispatch(
              "message",
              `Erreur ${error.status} - ${error.data.error}`
            );
          });
      }
    },
  },
};
</script>
