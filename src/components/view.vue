<template>
  <v-app>
    <div id="app">
      <v-toolbar class="mx-auto" dark color="indigo accent-3">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Galaxy Video</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link style="text-decoration: none; color: inherit;" to="/">
          <v-btn color="black">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar>
      <v-toolbar color="light">
        <v-toolbar-title class="mx-auto">{{ videoName }}</v-toolbar-title>
      </v-toolbar>

      <v-card class="mx-auto mt-16" width="1000" margin="0">
        <vimeo-player
          class="mx-auto"
          v-if="reque"
          ref="player"
          :video-id="videoId"
          :options="options"
        />
        <v-card-text>
          {{ videoDescription }}
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      options: {
        title: false,
        byline: false,
        responsive: true,
        portrait: false,
        controls: false,
      },
      videosData: [],
      videoName: "",
      videoDescription: "",
      videoId: "",
      reque: false,
    }
  },
  methods: {
    getVideosData() {
      fetch("http://localhost:2006/video-vimeo-videoid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoID: this.$route.params.videoid,
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((res) => {
          if (res.status == "success") {
            console.log("Res: ", res)
            this.videoName = res.data[0].name
            this.videoDescription = res.data[0].description
            this.videoId = res.data[0].vimeoId
            console.log(this.videoId)
            this.reque = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getVideosData()
    console.log(this.$route)
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
