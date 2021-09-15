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
      <v-toolbar-title class="mx-auto">Meus videos</v-toolbar-title>
    </v-toolbar>
    <v-row class="fill-height" align="center" justify="center">
      <v-col v-for="(video, i) in videosData" :key="i" cols="4">
        <template>
          <v-card class="mb-10 mt-10 ml-5" width="500">
            <v-toolbar class="mx-auto text-h6 text-center" dark>
              <v-btn
                class="pull-left"
                color="green lighten-1"
                @click="editOver(video)"
              >
                <v-icon>mdi-movie-open-edit-outline</v-icon>
              </v-btn>
              <v-toolbar-title
                class="mx-auto text-center"
                v-if="video.name"
                :key="'j' + i"
                v-text="video.name"
              >
              </v-toolbar-title>
              <v-btn
                class="pull-right"
                color="red lighten-1"
                dark
                @click="deletionOver(video)"
              >
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </v-toolbar>
            <router-link :to="`/view/${video.vimeoId}`">
              <v-img
                :src="video.thumbnail"
                width="100%"
                class="mx-auto"
              ></v-img>
            </router-link>
            <v-card-text>
              {{ video.description }}
            </v-card-text>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <v-overlay :value="editForm">
      <v-icon @click="editForm = false" class="pull-right">
        mdi-close-thick
      </v-icon>
      <v-card class="mt-9 mx-auto" width="1000px" justify-content-center light>
        <v-toolbar color="teal accent-4" dark>
          <v-toolbar-title class="mx-auto">Editar Video</v-toolbar-title>
        </v-toolbar>
        <v-img :src="videoimg" max-width="300" class="mx-auto mt-5"></v-img>
        <v-form ref="form">
          <v-text-field
            class="mx-10"
            v-model="newName"
            :rules="ruleRequired"
            label="Novo nome"
            required
          ></v-text-field>
          <v-text-field
            class="mx-10"
            v-model="newDescription"
            :rules="ruleRequired"
            label="Nova Descrição"
            required
          ></v-text-field>
        </v-form>
      </v-card>
      <div class="text-center">
        <v-btn class="mx-auto mt-5" success @click="editVideo">
          Editar
        </v-btn>
      </div>
    </v-overlay>
    <v-overlay :value="confirmDeletion">
      <v-card light class="mx-auto text-center">
        <v-card-title class="mx-auto red lighten-2 text-center">
          Excluir video
        </v-card-title>

        <v-card-text class="mt-5">
          Deseja realmente excluir o video?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success pull-left" text @click="deleteVideo">
            Confirmar
          </v-btn>
          <v-btn @click="confirmDeletion = false" text color="error">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-overlay :value="processing">
      <v-progress-circular
        size="300"
        indeterminate
        color="primary"
      ></v-progress-circular>
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
      confirmDeletion: false,
      dialog: false,
      newName: "",
      newDescription: "",
      processing: false,

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
    editVideo() {
      if (this.$refs.form.validate()) {
        console.log("NEWNAME", this.newName)
        console.log("NEWDESCRIPTION", this.newDescription)
        this.processing = true
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
              this.processing = false
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
      this.processing = true
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
            this.processing = false
            this.getVideosData()
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
