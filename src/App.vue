<template>
  <v-app>
    <router-view></router-view>
    <div v-if="$store.getters.getuploadBoxController">
      <uploadBox> </uploadBox>
    </div>
  </v-app>
</template>

<script>
import uploadBox from "./components/uploadBox.vue"

export default {
  components: {
    uploadBox,
  },
  mounted() {
    // console.log("GETTER:", this.$store.getters.getuploadBoxController)
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
