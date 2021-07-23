<template>
  <v-card-title>
    <v-avatar>
      <img :src="getImgUrl(avatar)" :alt="`Avatar de ${pseudonym}`" />
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
  methods: {
    getImgUrl(a) {
      return require(`@/assets/images/${a}`);
    },
  },
};
</script>
