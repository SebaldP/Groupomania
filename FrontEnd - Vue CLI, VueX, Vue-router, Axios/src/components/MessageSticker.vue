<template>
  <v-card
    class="mx-auto"
    color="#BBDEFB"
    dark
    max-width="400"
    @click="this.$router.push(`/Publication/${idMessages}`)"
  >
    <v-card-title class="text-h5 font-weight-bold">
      {{ title }}
    </v-card-title>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :alt="`Avatar de ${pseudonym}`"
            :src="image"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ pseudonym }}</v-list-item-title>
        </v-list-item-content>
        <v-row align="center" justify="end">
          <span class="subheading mr-2">{{ updatedAt }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "MessageSticker",
  props: {
    idMessages: Number,
    pseudonym: String,
    image: String,
    title: String,
    updatedAt: String,
  },
};
</script>
