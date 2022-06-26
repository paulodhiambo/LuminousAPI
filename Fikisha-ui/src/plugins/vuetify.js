import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3F51B5",
        secondary: colors.grey.darken1,
        accent: "#8d021f",
        error: colors.red.accent3,
        background: colors.grey.lighten3,
        aside: colors.indigo.darken3,
        info: colors.teal.darken1,
        landingBackground: colors.grey.lighten3,
      },
      dark: {
        primary: "#228A42",
        secondary: colors.grey.darken1,
        accent: colors.pink.darken1,
        background: "#121212",
      },
    },
  },
});

export default vuetify;
