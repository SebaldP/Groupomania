<template>
  <v-snackbar v-model="isVisible" multi-line timeout="2000">
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: String,
    isVisible: Boolean,
  },
};
</script>
