<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title><img src="/images/logo.png" alt="Logo" style="width:230px"></v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-2">
      <v-container>
            <slot />
      </v-container>
    </v-main>
  </v-app>
</template>