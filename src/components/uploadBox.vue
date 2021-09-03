<template>
  <div id="box">
    <v-card width="500">
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>Uploads</v-toolbar-title>
        <v-spacer> </v-spacer>
        <v-icon color="black" @click="boxToogle()">
          mdi-close
        </v-icon>
      </v-toolbar>
      <v-spacer></v-spacer>

      <v-list-item-group
        v-for="(video, i) in $store.getters.getvideoName"
        :key="i"
      >
        <v-list-item>
          <v-card-text
            class="mx-auto text-center"
            v-if="video.videoName"
            :key="'j' + i"
            v-text="video.videoName"
          >
          </v-card-text>

          <div id="progress">
            <v-container v-if="video.videoStatus == 'uploading'">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-container>
            <v-icon v-if="video.videoStatus == 'ready'" color="green" large>
              mdi-check-bold
            </v-icon>
            <v-icon v-if="video.videoStatus == 'failed'" color="red" large>
              mdi-close
            </v-icon>
          </div>
        </v-list-item>
        <v-divider> </v-divider>
      </v-list-item-group>
    </v-card>
    <v-snackbar v-model="snackbar" color="green accent-3" rounded="pill">
      Seu video está pronto, você já pode vê-lo na galeria

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="snackbar2"
      rounded="pill"
      :timeout="2000"
      color="red darken-3"
    >
      Houve um erro no upload do seu Vídeo, tente novamente.

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          :timeout="2000"
          @click="snackbar2 = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ready: false,
      verification: null,
      snackbar: false,
      snackbar2: false,
    }
  },
  methods: {
    boxToogle() {
      this.$store.dispatch("fetchuploadBoxContoller", false)
      this.$store.dispatch("clearVideo")
    },
    checkStatus() {
      let videoLength = this.$store.getters.getvideoName.length
      let ready = 0

      this.$store.getters.getvideoName.forEach((video, index) => {
        // console.log("video", video)
        if (video.videoStatus == "uploading") {
          fetch("http://localhost:2006/video-vimeo-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              videoname: video.videoName,
            }),
          })
            .then((response) => {
              return response.json()
            })
            .then((res) => {
              console.log("Response:", res)
              if (res.message == "Video está pronto!") {
                let vid = {
                  index: index,
                  videoStatus: "ready",
                }
                this.snackbar = true
                ready = ready + 1
                this.$store.dispatch("fetchVideoStatus", vid)
              } else if (res.message == "Upload do video Falhou!") {
                let vid = {
                  index: index,
                  videoStatus: "failed",
                }
                ready = ready + 1
                this.snackbar2 = true
                this.$store.dispatch("fetchVideoStatus", vid)
              }
              if (ready == videoLength) {
                this.ready = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (index + 1 == videoLength) {
          clearInterval(this.verification)
          this.verificationOfStatus()
        }
      })
    },

    verificationOfStatus() {
      this.verification = setInterval(() => {
        if (this.ready == true) {
          // clearInterval(verification)
          console.log(this.verification)
          this.ready = false
        } else {
          this.checkStatus()
        }
      }, 10000)
    },
  },

  mounted() {
    this.verificationOfStatus()
    console.log(this.$store.getters.getvideoName)
  },

  destroyed() {
    clearInterval(this.verification)
  },
}
</script>

<style>
#box {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 1%;
  margin-bottom: 1%;
}
#progress {
  right: 0;
}
</style>
