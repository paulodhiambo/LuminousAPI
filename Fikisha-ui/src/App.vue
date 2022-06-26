<template>
  <v-app id="inspire" v-cloak>
      <main-view/>
  </v-app>
</template>

<script>
import mainView from './views/mainView.vue'
export default {
  name: 'App',
  components: {
mainView
  },
  data: () => ({
    //
  }),

}
</script>
