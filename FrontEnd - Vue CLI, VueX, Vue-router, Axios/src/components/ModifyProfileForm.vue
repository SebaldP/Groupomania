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
      <img :src="avatar" :alt="`Possible avatar de ${newPseudonym}`" />
    </v-avatar>

    <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'Tu dois valider pour continuer !']"
      label="Valides-tu?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="modifyProfile"
    >
      Mettre à jour
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "ModifyProfileForm",
  data: () => ({
    newPseudonym: this.$store.state.userInfo.pseudonym,
    pseudonymRules: [(v) => !!v || "Le pseudonyme de requis !"],
    newPassword: "",
    confirmPassword: "",
    passwordRules: [
      (v) => {
        !!v || "Mot de passe requis";
      },
      (v) => {
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()'"`~,;:.<>\s])(?=.{8,})/.test(
          v
        ) ||
          "Mot de passe non valide ! Minimum (8 caractères): 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!?@#%&*€¤) !";
      },
    ],
    valid: true,
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),
  props: {
    pseudonym: String,
    avatar: String,
  },
  watch: {
    avatar() {
      return `@/assets/avatar/${this.select}.png`;
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
          image: `@/assets/avatar/${this.select}.png`,
          password: this.newPassword,
        };
        
        await this.$axios
          .put(
            `http://localhost:3000/api/user/profile/${sessionStorage.getItem("id")}?userId=${sessionStorage.getItem("id")}`,
            bodyContent,)
          .then((res) => {
            console.log(res.data);
            this.$store.dispatch("alertMessage", {
              text: `Réponse ${res.status} - ${res.data.message}`,
              color: "green",
              isVisible: true,
            });
            this.$store.dispatch("userInfo", {
              userId: res.data.user.userId,
              pseudonym: res.data.user.pseudonym,
              image: res.data.user.image,
              isAdmin: res.data.user.isAdmin,
              newUser: res.data.user.newUser,
            });
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("id", res.data.user.userId);
            this.$router.go();
          })
          .catch((err) => {
            console.log(err);
        console.log(err.error);
            this.$store.dispatch("alertMessage", {
              text: `Erreur ${err.status} - ${err.alert}`,
              color: "red",
              isVisible: true,
            });
          });
      } else {
        const bodyContent =JSON.stringify({
          pseudonym: this.newPseudonym,
          image: `@/assets/avatar/${this.select}.png`,
        });
        
        await this.$axios
          .put(
            `http://localhost:3000/api/user/profile/${sessionStorage.getItem(
              "id"
            )}?userId=${sessionStorage.getItem("id")}`, bodyContent)
          .then((res) => {
            console.log(res.data);
            this.$store.dispatch("alertMessage", {
              text: `Réponse ${res.status} - ${res.data.message}`,
              color: "green",
              isVisible: true,
            });
            this.$store.dispatch("userInfo", {
              userId: res.data.user.userId,
              pseudonym: res.data.user.pseudonym,
              image: res.data.user.image,
              isAdmin: res.data.user.isAdmin,
              newUser: res.data.user.newUser,
            });
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("id", res.data.user.userId);
            this.$router.go();
          })
          .catch((err) => {
            console.log(err);
        console.log(err.error);
            this.$store.dispatch("alertMessage", {
              text: `Erreur ${err.status} - ${err.alert}`,
              color: "red",
              isVisible: true,
            });
          });
      }
    },
  },
};
</script>
