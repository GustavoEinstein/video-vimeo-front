<template>
  <div>
    <v-toolbar class="mx-auto" dark color="indigo accent-3">
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
    <v-row class="fill-height" align="center" justify="center">
      <v-col v-for="(video, i) in videosData" :key="i" cols="4" class="mt-13">
        <template>
          <v-hover v-slot="{ hover }">
            <v-card
              class="mb-10  ml-5"
              width="500"
              :class="{ 'on-hover': hover }"
              :elevation="hover ? 12 : 2"
            >
              <v-toolbar>
                <v-card-title id="title" class="mt-3">
                  <p v-if="video.name" :key="'j' + i" v-text="video.name"></p
                ></v-card-title>
              </v-toolbar>
              <v-img id="img" :src="video.thumbnail" width="100%">
                <div id="play">
                  <router-link
                    style="text-decoration: none; color: inherit;"
                    :to="`/view/${video.vimeoId}`"
                    ><div id="player" class="align-self-center">
                      <v-btn
                        rounded
                        x-large:class="{ 'show-btns': hover }"
                        icon
                        fab
                      >
                        <v-icon
                          id="playIcon"
                          size="80px"
                          :class="{ 'show-btns': hover }"
                          outlined
                        >
                          mdi-play-circle-outline
                        </v-icon>
                      </v-btn>
                    </div>
                  </router-link>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </template>
      </v-col>
    </v-row>
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
      confirmDeletion: false,
      dialog: false,
      newName: "",
      newDescription: "",

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
  },

  mounted() {
    this.getVideosData()
  },
}
</script>

<style>
#title {
  align-content: center;
}

#play {
  position: absolute;
  width: 100px;
  height: 30px;
  top: 50%;
  left: 55%;
  margin: -13px 0px 0px -50px;
}

#qr {
  margin-right: 0;
  margin-left: auto;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

/* .v-card:not(.on-hover) {
  opacity: 0.8;
} */

.show-btns {
  color: rgb(240, 56, 56) !important;
}
</style>
