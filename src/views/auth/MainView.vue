<script setup>
import { ref } from 'vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
<template>
    <v-responsive>
      <v-app :theme="theme">
        <!-- Top Bar -->
        <v-app-bar color="green-darken-3" class="px-3">
          <v-spacer><h2>PUROK-KONEK</h2></v-spacer>
          <v-btn
            :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            text=""
            slim
            @click="toggleTheme"
          />
        </v-app-bar>
      </v-app>
    </v-responsive>
    </template>