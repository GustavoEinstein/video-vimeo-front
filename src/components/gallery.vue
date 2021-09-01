<template>
  <div>
    <v-toolbar class="mx-auto" dark color="indigo accent-3">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Orama Development </v-toolbar-title>
      <v-spacer></v-spacer>

      <router-link style="text-decoration: none; color: inherit;" to="/">
        <v-btn color="black">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-toolbar color="light">
      <v-toolbar-title class="mx-auto">Galaxy</v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col v-for="(video, i) in videosData" :key="i" cols="4" class="mt-13">
        <template>
          <v-btn
            class="mx-auto mt-10 ml-4 "
            min-width="0"
            width="24px"
            small
            text
            @click="getQR()"
          >
            <div>
              <v-icon @click="qrOver(video)">
                mdi-qrcode-scan
              </v-icon>
            </div>
          </v-btn>
          <v-card class="mb-10  ml-5" width="500">
            <router-link
              style="text-decoration: none; color: inherit;"
              :to="`/view/${video.vimeoId}`"
            >
              <v-img :src="video.thumbnail" width="100%" class="mx-auto">
                <v-card-title>
                  <p
                    class="mx-auto text-center"
                    v-if="video.name"
                    :key="'j' + i"
                    v-text="video.name"
                  ></p></v-card-title
              ></v-img>
            </router-link>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <v-overlay :value="qrcode" :opacity="1">
      <div class="mx-auto">
        <v-icon @click="qrcode = false" class="pull-right">
          mdi-close-thick
        </v-icon>
      </div>
      <div v-html="code">
        {{ code }}
      </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videosData: [],
      videolink: "",
      videoimg: "",
      videouri: "",
      overlay: false,
      selected: false,
      editForm: false,
      qrcode: false,
      confirmDeletion: false,
      dialog: false,
      newName: "",
      newDescription: "",
      code: "",

      //eslint-disable-next-line
      ruleRequired: [(v) => !!v || "Campo obrigatório"],
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
      fetch("http://localhost:2006/video-vimeo-get")
        .then((response) => {
          return response.json()
        })
        .then((res) => {
          if (res.status == "success") {
            // console.log("Res: ", res)
            this.videosData = res.data
            // console.log("videosData", this.videosData)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    over(vi) {
      console.log(" asqdasasdasd:", vi)
      this.videolink = vi.vimeoId

      this.overlay = !this.overlay
    },
    editOver(vid) {
      this.videoimg = vid.thumbnail
      this.videouri = vid.uri
      this.editForm = !this.editForm

      console.log(this.videouri)
    },
    deletionOver(vide) {
      this.videouri = vide.uri
      this.confirmDeletion = !this.confirmDeletion

      console.log(this.videouri)
    },
    qrOver(video) {
      this.videoid = video.vimeoId
      this.qrcode = !this.qrcode

      console.log(this.videoid)
    },
    editVideo() {
      if (this.$refs.form.validate()) {
        console.log("NEWNAME", this.newName)
        console.log("NEWDESCRIPTION", this.newDescription)
        fetch("http://localhost:2006/video-vimeo-edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newVideoName: this.newName,
            newVideoDescription: this.newDescription,
            videoUri: this.videouri,
          }),
        })
          .then((res) => {
            console.log("Response:", res)
            if (res.statusText == "OK") {
              this.editForm = false
              this.getVideosData()
            } else {
              alert("Já existe um video com esse nome !")
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    deleteVideo() {
      fetch("http://localhost:2006/video-vimeo-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video: this.videouri,
        }),
      })
        .then((res) => {
          console.log("ResponseP:", res)
          if (res.statusText == "OK") {
            this.confirmDeletion = false
            this.getVideosData()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getQR() {
      fetch("http://localhost:2006/video-vimeo-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video: this.videoid,
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((res) => {
          console.log("Response:", res)
          if (res.status == "success") {
            this.code = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },

  mounted() {
    this.getVideosData()
  },
}
</script>

<style></style>
