<template>
  <v-app>
    <div id="app">
      <v-toolbar class="mx-auto" dark color="indigo accent-3">
        <v-toolbar-title>Galaxy Video</v-toolbar-title>
        <v-spacer></v-spacer>

        <router-link style="text-decoration: none; color: inherit;" to="/">
          <v-btn color="black">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar>
      <v-card class="mt-16 mx-auto" width="1000px">
        <v-toolbar color="indigo accent-2" dark>
          <v-toolbar-title class="mx-auto">Upload</v-toolbar-title>
        </v-toolbar>
        <vue-dropzone
          @vdropzone-file-added="vfileAdded"
          @vdropzone-complete="vdropzoneComplete"
          @vdropzone-sending="vdropzoneSending"
          @vdropzone-error="vdropzoneError"
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
        ></vue-dropzone>
      </v-card>
      <v-card class="mt-9 mx-auto" width="1000px" justify-content-center>
        <v-form ref="form">
          <v-text-field
            class="mx-10"
            v-model="videoName"
            :rules="ruleRequired"
            label="Nome do Vídeo"
            required
          ></v-text-field>
          <v-text-field
            class="mx-10"
            v-model="videoDescription"
            :rules="ruleRequired"
            label="Descrição"
            required
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            :label="`Protegido por senha`"
            class="ml-10"
          ></v-checkbox>
          <v-text-field
            v-if="checkbox == true"
            class="mx-10"
            v-model="videoPassword"
            :rules="getRulePassword"
            label="Senha"
            required
          >
          </v-text-field>
        </v-form>
      </v-card>
      <div class="mt-10 text-center" @click="sendFile">
        <v-btn class="mx-auto" color="primary">
          Enviar
        </v-btn>

        <v-overlay :value="processing">
          <p>
            Estamos processando o seu Video, você será informado quando o upload
            terminar.
          </p>
          <v-progress-circular
            size="300"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-overlay>
      </div>
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
      checkbox: false,
      processing: false,

      //eslint-disable-next-line
      ruleRequired: [(v) => !!v || "Campo obrigatório"],

      videoName: "",
      videoDescription: "",
      videoPassword: null,
    }
  },
  methods: {
    vfileAdded(file) {
      // console.log("File:", file)
      this.file = file
      this.fileAdded = true
      // console.log("ref:", this.$refs.myVueDropzone)
      // window.toastr.info('', 'Event : vdropzone-file-added')
    },
    vdropzoneComplete(res) {
      if (res.status == "success") {
        this.$refs.myVueDropzone.dropzone.complete
        console.log("RES: ", res)
      } else {
        this.$refs.myVueDropzone.dropzone.ERROR
        this.processing = false
      }
    },
    // vdropzoneSuccess(file, response) {},
    vdropzoneSending(file) {
      console.log("File being sent:", file)
      let video = {
        videoName: this.$refs.myVueDropzone.options.headers.nameVideo,
        videoStatus: "uploading",
      }
      this.$refs.myVueDropzone.options.headers.nameVideo = this.videoName
      this.$store.dispatch("fetchuploadBoxContoller", true)
      this.$store.dispatch("fetchnameVideo", video)

      // this.$store.dispatch("fetchuploadBoxContoller", true)
      // this.$store.dispatch("fetchnameVideo", video)
    },
    vdropzoneError(file, message, xhr) {
      this.processing = false
      console.log("File:", file)
      console.log("message", message)
      console.log("Xhr:", xhr)
    },

    sendFile() {
      if (this.$refs.form.validate()) {
        console.log("File:", this.$refs.myVueDropzone.options.headers)

        if (this.checkbox == true) {
          this.$refs.myVueDropzone.options.headers.password = this.videoPassword
          this.$refs.myVueDropzone.options.headers.privacy = "password"
        }

        this.$refs.myVueDropzone.options.headers.password = null
        this.$refs.myVueDropzone.options.headers.privacy = "anybody"

        console.log("Resposta")
      }
    },
  },
  mounted() {
    // console.log("STORE:", this.$store)
  },
  computed: {
    getRulePassword() {
      if (this.checkbox == true) {
        return [(v) => !!v || "Campo obrigatório"]
      } else {
        return []
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
.dz-progress {
  /* progress bar covers file name */
  display: none !important;
}
.dz-success-mark {
  /* progress bar covers file name */
  display: none !important;
}
</style>
