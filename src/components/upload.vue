<template>
  
  <v-app>
    <div id="app">
        <v-toolbar class="mx-auto"
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Galaxy Video</v-toolbar-title>
        <v-spacer></v-spacer>
               <router-link to="/">
                  <v-btn>
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>
                </router-link>
      </v-toolbar>
        <v-card class="mt-16 mx-auto" width="1000px">
          <v-toolbar color="indigo" dark>
            <v-toolbar-title class="mx-auto">Upload</v-toolbar-title>
          </v-toolbar>
          <vue-dropzone
            @vdropzone-file-added="vfileAdded"
            @vdropzone-complete="vdropzoneComplete"
            @vdropzone-sending="vdropzoneSending"
            @vdropzone-success="vdropzoneSuccess"
            @vdropzone-error="vdropzoneError"
            @vdropzone-total-upload-progress="vprogress"
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
          ></vue-dropzone>
        </v-card>
        <v-card class="mt-9 mx-auto" width="1000px" justify-content-center>
        <v-form ref="form">
          <v-text-field class="mx-10"
            v-model="videoName"
            :rules="ruleRequired"
            label="Nome do Vídeo"
            required
          ></v-text-field>
          <v-text-field class="mx-10"
            v-model="videoDescription"
            :rules="ruleRequired"
            label="Descrição"
            required
          ></v-text-field>
        </v-form>
        <div class="text-center">
          <v-btn class="mx-auto" color="primary" @click="sendFile"> Enviar </v-btn>
        </div>
        </v-card>
    </div>
  </v-app>
</template>

<script>
import vue2Dropzone from "vue2-dropzone"
import "vue2-dropzone/dist/vue2Dropzone.min.css"

export default {
  name: "app",
  components: {
    vueDropzone: vue2Dropzone,
  },

  data: function() {
    return {
      file: null,
      dropzoneOptions: {
        url: "http://localhost:2006/video-vimeo-upload",
        thumbnailWidth: 150,
        headers: {
          "My-Awesome-Header": "header value",
          nameVideo: "",
          descriptionVideo: "",
        },
        autoProcessQueue: false,
        addRemoveLinks: true,
        dictRemoveFile: "Remover Arquivo",
        dictCancelUpload: "Cancelar Upload",
        dictCancelUploadConfirmation: "Deseja realmente cancelar o Upload?",
        dictDefaultMessage: "Clique aqui ou arraste o video para fazer upload",
        maxFilesize: 1000,
      },
      success: false,
      error: false,
      sending: false,

      //eslint-disable-next-line
      ruleRequired: [(v) => !!v || "Campo obrigatório"],

      videoName: "",
      videoDescription: "",
    }
  },
  methods: {
    vfileAdded(file) {
      console.log("File:", file)
      this.file = file
      this.fileAdded = true
      console.log("ref:", this.$refs.myVueDropzone)
      // window.toastr.info('', 'Event : vdropzone-file-added')
    },
    vdropzoneComplete(res) {
      console.log("RES: ", res)
      this.$refs.myVueDropzone.dropzone.complete
    },
    vdropzoneSending(file, formData) {
      console.log("File:", file)
      console.log("formData", formData)
      // console.log("Xhr:", xhr)
    },
    vdropzoneSuccess(file, response) {
      console.log("File:", file)
      console.log("Response:", response)
    },
    vdropzoneError(file, message, xhr) {
      console.log("File:", file)
      console.log("message", message)
      console.log("Xhr:", xhr)
    },
    vprogress(totaluploadprogress, totalBytes, totalBytesSent) {
      const resultProgress = setInterval(() => {
        console.log("Progress: ", totaluploadprogress + " - " + totalBytesSent)
        if (totaluploadprogress == 100) {
          alert("Video enviado com sucesso!")
          clearInterval(resultProgress)
        }
      }, 3000)
    },

    sendFile() {
      if (this.$refs.form.validate()) {
        this.$refs.myVueDropzone.options.headers.nameVideo = this.videoName
        this.$refs.myVueDropzone.options.headers.descriptionVideo = this.videoDescription

        console.log("REFS:", this.$refs.myVueDropzone)

        this.$refs.myVueDropzone.processQueue()
      }
    },
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
