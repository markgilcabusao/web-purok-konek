<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="green-darken-3">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text=""
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" md="4">
              <br />
              <v-card class="pa-4" elevation="8">
                <v-form @submit.prevent>
                  <h1 class="text-center">Create a new account</h1>
                  <p class="text-center">It’s quick and easy.</p>
                  <br />
                  <v-text-field label="Full Name" variant="outlined" density="comfortable" />
                  <v-select
                    label="Gender"
                    :items="['Male', 'Female']"
                    variant="outlined"
                    density="comfortable"
                  />
                  <v-text-field
                    label="Age"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                  />
                  <v-text-field
                    label="Mobile Number"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    prefix="+63"
                  />
                  <v-text-field label="Email" variant="outlined" density="comfortable" />
                  <v-text-field
                    label="Password"
                    type="password"
                    variant="outlined"
                    density="comfortable"
                  />
                  <v-btn type="submit" block color="green-darken-3" class="signup white--text mb-2">
                    Sign Up
                  </v-btn>
                </v-form>
                <router-link to="/" class="text-decoration-none">
                  <p class="text-center green--text">Already have an account?</p>
                </router-link>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
