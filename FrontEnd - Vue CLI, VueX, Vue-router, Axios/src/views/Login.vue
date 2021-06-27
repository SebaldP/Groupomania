<template>
  <v-main>
    <v-card width="500" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Se connecter</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation v-model="formValid">
          <v-text-field
            label="Numéro de matricule"
            prepend-icon="mdi-account-circle"
            :rules="registrationRules"
            :counter="10"
            v-model="registration"
            required
          />
          <v-text-field
            v-show="rememberPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Mot de passe"
            :rules="passwordRules"
            v-model="password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
          />
          <v-text-field
            v-show="!rememberPassword"
            type="text"
            label="Clé de réinitialisation"
            :rules="resetKeyRules"
            v-model="resetKey"
            prepend-icon="mdi-lock"
            required
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions v-if="rememberPassword">
        <v-btn
          :disabled="!formValid"
          color="rgb(255, 215, 215)"
          @click="loginUser"
          >Envoyer</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="rgb(255, 215, 215)" @click="forgetPassword">
          Mot de passe oublié?
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn
          :disabled="!formValid"
          color="rgb(255, 215, 215)"
          @click="resetPassword"
          >Réinitialiser le mot de passe</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="rgb(255, 215, 215)" @click="forgetPassword">
          Je me rappelle!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import userService from "../service/userService";

export default {
  name: "Login",
  data: () => ({
    formValid: false,
    rememberPassword: true,
    showPassword: false,
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
  }),
  methods: {
    async loginUser() {
      const bodyContent = {
        registration: this.registration,
        password: this.password,
      };
      await userService.loginUser(
        bodyContent,
        (res) => {
          this.$store.dispatch("alertMessage", {
            text: `Réponse ${res.status} - ${res.data.message}`,
            color: "green",
            isVisible: true,
          });
          this.$store.dispatch("userInfo", res.data.user);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("id", res.data.user.userId);
          this.$router.push("/Accueil");
        },
        (err) => {
          this.forgetPassword();
          this.$store.dispatch("alertMessage", {
            text: `Erreur ${err.status} - ${err.data.err}`,
            color: "red",
            isVisible: true,
          });
        }
      );
    },
    async resetPassword() {
      const bodyContent = {
        registration: this.registration,
        key: this.resetKey,
      };
      await userService.resetPasswordUser(
        bodyContent,
        (res) => {
          this.$store.dispatch("alertMessage", {
            text: `Réponse ${res.status} - ${res.data.message}`,
            color: "green",
            isVisible: true,
          });
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
    forgetPassword() {
      return (this.rememberPassword = !this.rememberPassword);
    },
  },
};
</script>
