<template>
  <v-card class="mx-auto">
    <v-toolbar color="indigo" dark>
      <v-toolbar-title class="mx-auto">Autem</v-toolbar-title>
      <router-link to="/upload">
        <v-btn>
          <v-icon>mdi-upload</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-menu>
      <v-carousel :show-arrows="false">
        <v-carousel-item
          v-for="(pictures, i) in videosData"
          :key="i"
          :src="pictures.pictures.sizes[5].link_with_play_button"
        ></v-carousel-item>
      </v-carousel>
    </v-menu>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      videosData: [],
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      rReady: false,
    }
  },
  methods: {
    onReady() {
      this.playerReady = true
    },
    play() {
      this.$refs.player.play()
    },
    pause() {
      this.$refs.player.pause()
    },
    getVideosData() {
      fetch("http://localhost:2005/video-vimeo-get")
        .then((response) => {
          return response.json()
        })
        .then((res) => {
          console.log("res:", res.data)
          this.videosData = res.data
          console.log("videosData", this.videosData[0].pictures)
        })
    },
  },
  mounted() {
    this.getVideosData()
  },
}
</script>

<style></style>
