<template>
  <div>
    <v-card width="400px" class="pull-right">
      <v-card-title class="mx-auto">
        Uploads
      </v-card-title>
      <v-alert
        v-model="alert"
        dismissible
        color="cyan"
        border="left"
        class="mt-10"
        elevation="2"
        colored-border
      >
        You've got <strong>5</strong> new updates on your timeline!.
      </v-alert>
    </v-card>
  </div>
</template>

<script></script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
