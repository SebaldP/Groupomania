<template>
  <section>
    <v-card class="mx-auto deep-orange lighten-4" max-width="420">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1 mt-2 text-center">
            Bienvenue à toi, {{ userPseudonym }} !
          </v-list-item-title>
          <v-list-item-subtitle class="text-center"
            >Etant nouveau sur cette application, veux-tu actualiser les
            informations de ton profil?</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-card-actions class="d-flex flex-column justify-center">
        <v-btn v-if="!FormisVisible" outlined rounded text @click="showForm">
          Oui, je le veux !
        </v-btn>
        <v-btn v-else outlined rounded text @click="showForm">
          Laisser tomber !
        </v-btn>
      </v-card-actions>
    </v-card>
    <modify-profile-form
      v-show="FormisVisible"
      :pseudonym="userPseudonym"
      :avatar="userAvatar"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ModifyProfileForm from "./ModifyProfileForm";

export default {
  name: "WelcomeUser",
  components: {
    ModifyProfileForm,
  },
  data: function () {
    return {
      FormisVisible: false,
    };
  },
  computed: {
    ...mapGetters(["userPseudonym", "userAvatar"]),
  },
  methods: {
    showForm() {
      return (this.FormisVisible = !this.FormisVisible);
    },
  },
};
</script>
