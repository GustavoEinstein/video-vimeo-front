<template>
<div>
      <v-toolbar class="mx-auto"
        dark
        elevation= 0
        color = "blue"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Galaxy Video</v-toolbar-title>
        <v-spacer></v-spacer>
               <router-link to="/upload">
                  <v-btn>
                    Upload
                  </v-btn>
                </router-link>
      </v-toolbar>
  <v-card class = "mt-16 mx-auto" max-width="600px" >
        <v-toolbar color="indigo" dark>
            <v-toolbar-title class="mx-auto">Autem</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
          <v-list-item-group
        v-model="selected"
        active-class="pink--text"
        multiple
      >
          <template v-for="(video, i) in videosData">
          <v-subheader
            v-if="video.name"
            :key= "i"
            v-text="video.name"
            class="mx-auto font-weight-black"
            
          ><v-divider class="dark"></v-divider></v-subheader>
          
          <v-list-item
           :key="'j'+i"
          >
          <template v-slot:default="{ active }">
          <v-list-item-avatar size="150" rounded="0" @click="overlay = !overlay">
            <v-img :src="video.pictures.sizes[6].link_with_play_button"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
             <v-list-item-title v-text="'Descrição: ' + video.description"></v-list-item-title>
             <v-list-item-title v-text="'URL: ' + video.uri"></v-list-item-title>
              <v-list-item-title v-text="'Duração do Video: '+ video.duration + ' segundos'"></v-list-item-title>
            <v-overlay :value="overlay">
              <v-card>
                <v-btn  @click="overlay = false">
                 Fechar
                </v-btn>
                  <vimeo-player ref="player" :video-url="video.link"/>
              </v-card>
           </v-overlay>  
          </v-list-item-content>
                        <v-list-item-action>
                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>
              </v-list-item-action>
          </template>
        </v-list-item>
            <v-divider
              v-if="video < video.length - 1"
              :key="video"
            ></v-divider>
      </template>
          </v-list-item-group>
    </v-list>
  </v-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      videosData: [],
       overlay: false,
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
          this.videosData = res.data
          console.log("videosData", this.videosData
          )
        })
    },
  },
  mounted() {
    this.getVideosData()
  },
}
</script>

<style></style>
