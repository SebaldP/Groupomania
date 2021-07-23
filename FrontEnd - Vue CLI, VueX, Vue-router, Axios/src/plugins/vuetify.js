import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#1960FC",
        secondary: "#FD2D01",
        error: "#FD2D01",
        success: "#1960FC",
        warning: "#FFC107",
        lightblue: "#BDE5FF",
        lightyellow: "#FFFEBD",
        darkblue: "#1960FC",
        gray: "#909090",
        neutralgray: "#9BA6C1",
        lightred: "#FFD7D7",
        darkred: "#FD2D01",
        lightgray: "#BDBDBD",
        white: "#FFFFFF",
      },
    },
  },
});
