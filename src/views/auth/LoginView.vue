<script setup>
import { ref } from 'vue'

const email = ref('')
const emailRule = (value) => value.includes('@') || 'Email must contain @'

const visible = ref(false)

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

      <!-- Main Content -->
      <v-main>
        <v-container class="fill-height">
          <v-row align="center" justify="center">
            <!-- Left Section -->
            <v-col cols="12" md="6" class="text-center text-md-left">
              <v-img src="PUROK-KONEK-LOGO.jpg" width="400" height="350"></v-img>
              <h1 class="purokkonek-title">PUROK-KONEK</h1>
              <p class="purok-subtitle"></p>
            </v-col>

            <!-- Right Section -->
            <v-col cols="12" md="4">
              <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
                <h1 class="text-center">Welcome back!</h1>
                <p class="text-center">We're so excited to see you again!</p>
                <br />
                <div class="text-subtitle-1 text-medium-emphasis">Email</div>

                <v-text-field
                  v-model="email"
                  density="compact"
                  placeholder="Email address"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  :rules="[emailRule]"
                  error-messages=""
                ></v-text-field>

                <div
                  class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
                >
                  Password
                </div>

                <v-text-field
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  density="compact"
                  placeholder="Enter your password"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  @click:append-inner="visible = !visible"
                ></v-text-field>

                <v-btn type="submit" block color="green-darken-3" class="signup white--text mb-2">
                  <router-link to="/main" class="text-decoration-none">
                    <p class="text-center text-white">Log in</p>
                  </router-link>
                </v-btn>
                <router-link to="/register" class="text-decoration-none">
                  <p class="text-center green--text">Create new account</p>
                </router-link>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.purokkonek-title {
  color: #2e7d32;
  font-size: 3.5rem;
  font-weight: bold;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.purok-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  margin-top: 10px;
  max-width: 80%;
}
</style>
