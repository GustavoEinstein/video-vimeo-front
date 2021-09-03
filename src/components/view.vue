<template>
  <v-app>
    <div id="app">
      <v-toolbar class="mx-auto" dark color="indigo accent-3">
        <v-toolbar-title>Galaxy Video</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link
          style="text-decoration: none; color: inherit;"
          to="/gallery"
        >
          <v-btn color="black">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar>
      <v-toolbar color="light">
        <v-toolbar-title class="mx-auto">{{ videoName }}</v-toolbar-title>
      </v-toolbar>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card class="mx-auto mt-16 justify-center" width="1000" margin="0">
            <vimeo-player
              class="mx-auto"
              v-if="reque"
              ref="player"
              :video-id="videoId"
              :options="options"
            />
            <v-card-title class="justify-center mt-3">
              <p>
                {{ videoName }}
              </p>
            </v-card-title>
            <v-divider class="mt-2"></v-divider>
            <v-card-subtitle>
              <p class="font-weight-black">
                Descrição
              </p>
            </v-card-subtitle>
            <v-card-text>
              {{ videoDescription }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-img width="500" class="justify-center mx-auto mt-10">
            <div>
              <v-img :src="this.code" width="200" class="mx-auto"> </v-img>
            </div>
          </v-img>
        </v-col>
      </v-row>
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
      code: "",
      qr: false,
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
            // console.log("Res: ", res)
            this.videoName = res.data[0].name
            this.videoDescription = res.data[0].description
            this.videoId = res.data[0].vimeoId
            // console.log(this.videoId)
            this.reque = true

            fetch("http://localhost:2006/video-vimeo-qr", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                video: this.videoId,
              }),
            })
              .then((response) => {
                return response.json()
              })
              .then((res) => {
                console.log("Response:", res)
                if (res.status == "success") {
                  console.log("Antes de cortar a string:", res.data)
                  let index = res.data.indexOf("<div")
                  let index2 = res.data.indexOf("alt")

                  let codeSubstr = res.data.substr(index, index2)

                  let index3 = codeSubstr.indexOf("data")

                  this.code = codeSubstr.substr(index3)

                  this.code = this.code.replace('"', "")

                  console.log(typeof this.code)
                  console.log("Depois de cortar a string:", this.code)
                }
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // getQR() {
    //   fetch("http://localhost:2006/video-vimeo-qr", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       video: this.videoId,
    //     }),
    //   })
    //     .then((response) => {
    //       return response.json()
    //     })
    //     .then((res) => {
    //       console.log("Response:", res)
    //       if (res.status == "success") {
    //         this.code = res.data
    //         console.log(typeof this.code)
    //         console.log("QRCODE:", this.code)
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
  },
  mounted() {
    this.getVideosData()
    console.log(this.$route)
    // this.getQR()
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
