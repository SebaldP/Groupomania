<template>
  <v-card
    :color="isModerator || isAdmin ? 'lightblue' : 'lightred'"
    class="d-flex flex-column align-center"
  >
    <v-avatar class="mt-6" size="150">
      <img :src="getImgUrl(avatar)" :alt="`Avatar de ${pseudonym}`" />
    </v-avatar>
    <v-card-title
      class="headline"
      style="min-width: 0"
      :color="isModerator || isAdmin ? 'darkblue' : 'darkred'"
    >
      {{ pseudonym }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "UserSticker",
  props: {
    isAdmin: Boolean,
    isModerator: Boolean,
    pseudonym: String,
    avatar: String,
  },
  methods: {
    getImgUrl(a) {
      return require(`@/assets/images/${a}`);
    },
  },
};
</script>
