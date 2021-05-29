<template>
  <MessagePopup v-if="message"/>
  <router-view v-if="Authorization"/>
  <Auth v-else/>
</template>

<script>
import {mapGetters} from 'vuex'
import Auth from './components/Auth.vue'
import MessagePopup from './components/MessagePopup.vue'

export default {
  name: 'App',
  components: {
    Auth,
    MessagePopup
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['message'])
  },
  methods: {
    Authorization(){
      const Token = sessionStorage.getItem("token");
      const User = this.user;
      if (Token&&User){
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
