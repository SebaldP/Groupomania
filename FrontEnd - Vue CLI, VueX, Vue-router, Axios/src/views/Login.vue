<template>
  <v-main>
    <v-card width="500" class="mx-auto mt-5" v-if="sessionData">
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
            :required="rememberPassword"
          />
          <v-text-field
            v-show="!rememberPassword"
            type="text"
            label="Clé de réinitialisation"
            :rules="resetKeyRules"
            v-model="resetKey"
            prepend-icon="mdi-lock"
            :required="!rememberPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions v-if="rememberPassword">
        <v-btn :disabled="!formValid" :color="colorLightRed" @click="loginUser"
          >Envoyer</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn :color="colorLightRed" @click="forgetPassword">
          Mot de passe oublié?
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn
          :disabled="!formValid"
          :color="colorLightRed"
          @click="resetPassword"
          >Réinitialiser le mot de passe</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn :color="colorLightRed" @click="forgetPassword">
          Je me rappelle!
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card width="500" class="mx-auto mt-5" v-else>
      <v-card-title>
        <h1 class="display-1">Se connecter?</h1>
      </v-card-title>
      <v-card-text>
        Vous êtes déjà connecté.e!
        <router-link to="/Accueil"></router-link>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn to="/Accueil" color="lightred"
          >Retourner à l'accueil</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data: function () {
    return {
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
      idValue: sessionStorage.getItem('id') || '',
      tokenValue: sessionStorage.getItem('token') || '',
      sessionData: true
    };
  },
  methods: {
    async loginUser() {
      const bodyContent = {
        registration: this.registration,
        password: this.password,
      };
      const authOptions = {
        method: "POST",
        baseURL: "http://localhost:3000/api/",
        url: `/user/login`,
        data: JSON.stringify(bodyContent),
        headers: {
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
          const firstDate = res.data.user.createdAt.split("T")[0];
          const lastDate = res.data.user.updatedAt.split("T")[0];
          this.$store.dispatch("userInfo", {
            userId: res.data.user.userId,
            pseudonym: res.data.user.pseudonym,
            avatar: res.data.user.avatar,
            isAdmin: res.data.user.isAdmin,
            isModerator: res.data.user.isModerator,
            newUser: firstDate == lastDate ? true : false
          });
          this.tokenSession = res.data.token;
          this.idSession = res.data.user.userId;
          if (firstDate == lastDate && res.data.user.isAdmin) {
            this.$router.push({ path: "/Admin" }).catch(() => {});
          } else if (firstDate == lastDate && !res.data.user.isAdmin) {
            this.$router.push({ path: "/Mur" }).catch(() => {});
          } else {
            this.$router.push({ path: "/Accueil" }).catch(() => {});
          }
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
          this.rememberPassword = !this.rememberPassword;
          this.$store.dispatch("alertMessage", {
            text: `Erreur ${err.response.status} - ${err.response.data.alert}`,
            backgroundColor: "lightred",
            color: "darkred",
            isVisible: true,
          });
        });
    },
    async resetPassword() {
      const bodyContent = {
        registration: this.registration,
        key: this.resetKey,
      };
      const authOptions = {
        method: "PUT",
        baseURL: "http://localhost:3000/api/",
        url: `/user/reset-password`,
        data: JSON.stringify(bodyContent),
        headers: {
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
          this.rememberPassword = !this.rememberPassword;
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
    forgetPassword() {
      return (this.rememberPassword = !this.rememberPassword);
    },
  },
  computed: {
    ...mapGetters(["colorLightRed", "colorLightBlue"]),
    tokenSession: {
      get: function() {
        return this.tokenValue;
      },
      set: function(token_newValue) {
        this.tokenValue = token_newValue;
        sessionStorage.setItem('token', token_newValue)
      }
    },
    idSession: {
      get: function() {
        return this.idValue;
      },
      set: function(id_newValue) {
        this.idValue = id_newValue;
        sessionStorage.setItem('id', id_newValue)
      }
    },
  },
  watch: {
    sessionData() {
      !this.tokenSession && !this.idSession;
    }
  },
};
</script>
