<template>
  <v-card-title class="white--text mt-8">
    <v-avatar>
      <img :src="avatar" :alt="`Avatar de ${pseudonym}`" />
    </v-avatar>
    <p class="ml-3 display-1">{{ pseudonym }}</p>
  </v-card-title>
</template>

<script>
export default {
  name: "UserSticker",
  props: {
    id: Number,
    pseudonym: String,
    avatar: String,
  },
};
</script>
