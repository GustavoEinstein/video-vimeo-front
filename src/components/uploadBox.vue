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
          </div>
        </v-list-item>
        <v-divider> </v-divider>
      </v-list-item-group>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ready: false,
    }
  },
  methods: {
    boxToogle() {
      this.$store.dispatch("fetchuploadBoxContoller", false)
    },
    checkStatus() {
      this.$store.getters.getvideoName.forEach((video, index) => {
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
                this.$store.dispatch("fetchVideoStatus", vid)
              } else if (res.message == "Upload do video Falhou!") {
                let vid = {
                  index: index,
                  videoStatus: "failed",
                }
                this.$store.dispatch("fetchVideoStatus", vid)
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
    },
    callCheckStatus() {
      let verificationOfStatus = setInterval(() => {
        if (this.ready == false) {
          // console.log("Loop verification Transcode number: ", countLoop)
          this.checkStatus()
        } else clearInterval(verificationOfStatus)
      }, 10000)
    },
  },
  mounted() {
    this.callCheckStatus()
    console.log(this.$store.getters.getvideoName)
  },
}
</script>

<style>
#box {
  position: absolute;
  bottom: 0;
  right: 0;
}
#progress {
  right: 0;
}
</style>
