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
      <v-card class="mt-9 mx-auto" width="1000px" justify-content-center>
        <v-toolbar color="indigo accent-2" dark>
          <v-toolbar-title class="mx-auto">Upload</v-toolbar-title>
        </v-toolbar>
        <v-form ref="form" encType="multipart/form-data">
          <v-text-field
            class="mx-10"
            v-model="video.name"
            :rules="ruleRequired"
            label="Nome do Vídeo"
            required
          ></v-text-field>
          <v-text-field
            class="mx-10"
            v-model="video.description"
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
            v-model="video.password"
            :rules="getRulePassword"
            label="Senha"
            required
          >
          </v-text-field>
          <v-divider class="mt-6"> </v-divider>
          <div id="fileInput" class="mx-auto mt-6">
            <v-file-input
              label="Escolha um Video"
              accept="video/*"
              outlined
              type="file"
              truncate-length="50"
              prepend-icon="mdi-video-box"
              v-model="videoFile"
              :show-size="1000"
            ></v-file-input>
          </div>
        </v-form>
      </v-card>
      <div class="mt-10 text-center" @click="sendFile()">
        <v-btn class="mx-auto" color="primary">
          Enviar
        </v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "app",
  components: {},

  data: function() {
    return {
      file: "",
      success: false,
      error: false,
      sending: false,
      checkbox: false,
      video: {
        name: null,
        description: null,
        password: null,
        privacy: null,
        videoFile: null,
      },
      videoFile: null,

      //eslint-disable-next-line
      ruleRequired: [(v) => !!v || "Campo obrigatório"],

      videoName: "",
      videoDescription: "",
      videoPassword: null,
      privacy: "",
      password: "",
    }
  },
  methods: {
    sendFile() {
      if (this.$refs.form.validate()) {
        let video = {
          videoName: this.video.name,
          videoStatus: "uploading",
        }
        this.$store.dispatch("fetchuploadBoxContoller", true)
        this.$store.dispatch("fetchnameVideo", video)

        if (this.checkbox == true) {
          this.video.privacy = "password"
        } else {
          this.video.privacy = "anybody"
        }

        console.log("video", this.video)

        let formData = new FormData()

        formData.append("file", this.videoFile, "video.mp4")

        fetch("http://localhost:2006/video-vimeo-upload", {
          method: "POST",
          headers: {
            name: this.video.name,
            description: this.video.description,
            privacy: this.video.privacy,
            password: this.video.password,
          },
          body: formData,
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
        this.$router.push("/")
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
#fileInput {
  align-content: center;
  width: 700px;
  align-self: center;
}
</style>
