<template>
  <v-form ref="form" v-model="valid" lazy-validation class="grey lighten-3">
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
      :rules="!!newPassword.length ? passwordRules : null"
      label="Mot de passe"
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword"
      :rules="!!newPassword.length ? passwordRules : null"
      label="Confirmez le mot de passe"
      :required="!!newPassword.length ? true : false"
    ></v-text-field>

    <v-avatar v-if="!select==this.userAvatar">
      <img :src="avatarLive" :alt="`Possible avatar de ${newPseudonym}`" />
    </v-avatar>

    <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'Vous devez cocher pour continuer !']"
      :label="checkbox ? `J'approuve!` : 'Vous approuvez?'"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      :color="userIsModerator || userIsAdmin ? 'lightblue' :'lightred'"
      class="mr-4"
      @click="modifyProfile"
    >
      Mettre à jour
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ModifyProfileForm",
  data: function () {
    return {
      newPseudonym: this.$store.state.userInfo.pseudonym,
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
      select: this.userAvatar,
      items: ["Standard", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },
  props: {
    pseudonym: String,
    avatar: String,
  },
  watch: {
    avatarLive() {
      return require(`@/assets/images/${this.select}`);
    },
  },
  methods: {
    async modifyProfile() {
      if (
        !this.newPassword == null &&
        !this.confirmPassword == null &&
        this.newPassword === this.confirmPassword
      ) {
        const bodyContent = {
          pseudonym: this.newPseudonym,
          avatar: this.select,
          password: this.newPassword,
        };
        const authOptions = {
          method: "PUT",
          baseURL: "http://localhost:3000/api/",
          url: `/user/profile/${sessionStorage.getItem(
            "id"
          )}?g=${sessionStorage.getItem("id")}`,
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
            this.$store.dispatch("userInfo", {
              userId: res.data.user.userId,
              pseudonym: res.data.User.pseudonym,
              avatar: res.data.user.avatar,
              isAdmin: res.data.user.isAdmin,
              isModerator: res.data.user.isModerator,
              newUser: false,
            });
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("id", res.data.user.userId);
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
      } else {
        const bodyContent = {
          pseudonym: this.newPseudonym,
          avatar: this.select,
        };
        const authOptions = {
          method: "PUT",
          baseURL: "http://localhost:3000/api/",
          url: `/user/profile/${sessionStorage.getItem(
            "id"
          )}?g=${sessionStorage.getItem("id")}`,
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
            this.$store.dispatch("userInfo", {
              userId: res.data.user.userId,
              pseudonym: res.data.User.pseudonym,
              avatar: res.data.user.avatar,
              isAdmin: res.data.user.isAdmin,
              isModerator: res.data.user.isModerator,
              newUser: res.data.user.newUser,
            });
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("id", res.data.user.userId);
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
      }
    },
  },
  computed: {
    ...mapGetters([
      "userAvatar",
      "userIsModerator",
      "userIsAdmin",
      "colorLightRed",
      "colorLightBlue"
    ]),
  },
};
</script>
