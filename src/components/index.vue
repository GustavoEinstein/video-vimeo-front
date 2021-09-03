<template>
  <div>
    <v-toolbar class="mx-auto" dark color="indigo accent-3">
      <v-toolbar-title>Orama Development </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-toolbar color="light">
      <v-toolbar-title class="mx-auto">Galaxy Videos</v-toolbar-title>
    </v-toolbar>
    <v-container class="mx-auto" fluid>
      <v-row class="mx-auto headline mt-12 pt-2 mb-2 ml-10">
        Selecione a ferramenta que deseja utilizar:
      </v-row>
      <v-row>
        <v-col class="mt-10" cols="3">
          <v-card max-width="344" class="ml-16">
            <v-card-text>
              <div class="type-title">
                <v-icon right class="right"> mdi-video-box </v-icon>
                Assistir Videos
              </div>

              <div class="type-text">
                Assista videos
              </div>
            </v-card-text>

            <v-card-actions right>
              <v-spacer />
              <v-btn text router :to="'/gallery'">
                Selecionar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="mt-10" cols="3">
          <v-card max-width="344">
            <v-card-text>
              <div class="type-title">
                <v-icon right class="right"> mdi-video-account </v-icon>
                Meus Videos
              </div>

              <div class="type-text">
                Gerencie seus videos
              </div>
            </v-card-text>

            <v-card-actions right>
              <v-spacer />
              <v-btn text router :to="'/userVideos'">
                Selecionar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="mt-10" cols="3">
          <v-card max-width="344">
            <v-card-text>
              <div class="type-title">
                <v-icon right class="right"> mdi-upload </v-icon>
                Upload
              </div>

              <div class="type-text">
                Faça upload de novos videos
              </div>
            </v-card-text>

            <v-card-actions right>
              <v-spacer />
              <v-btn text router :to="'/upload'">
                Selecionar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script></script>

<style scoped>
.type-title {
  font-size: 18px !important;
  font-weight: medium;
  letter-spacing: 0.02em !important;
  height: 70px;
}

.type-text {
  color: #757575;
  height: 80px;
}
</style>
