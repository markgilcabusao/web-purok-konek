<script setup>
import { ref } from 'vue'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validator'

// Theme toggle functionality
const theme = ref('light')
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Form reference and data
const refVForm = ref(null)
const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}
const formData = ref({ ...formDataDefault })

// Password visibility toggles
const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)

// Login function
const onLogin = () => {
  alert(`Registration successful! Welcome, ${formData.value.firstname}!`)
}

// Form submission handler
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onLogin()
  })
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <!-- Top Bar -->
      <v-app-bar color="green-darken-3" class="px-3">
        <v-spacer><h2>PUROK-KONEK</h2></v-spacer>
        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="toggleTheme"
        />
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
              <v-card class="mx-auto pa-6" elevation="8" rounded="lg">
                <br /><br />
                <v-card-title class="text-h4 text-center">Create a new <br>account</v-card-title>
                <v-card-subtitle class="text-center pb-4">It's quick and easy.</v-card-subtitle>

                <v-form ref="refVForm" @submit.prevent="onFormSubmit">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.firstname"
                        label="Firstname"
                        variant="outlined"
                        density="comfortable"
                        :rules="[requiredValidator]"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.lastname"
                        label="Lastname"
                        variant="outlined"
                        density="comfortable"
                        :rules="[requiredValidator]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.email"
                        label="Email"
                        variant="outlined"
                        density="comfortable"
                        :rules="[requiredValidator, emailValidator]"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.password"
                        label="Password"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="isPasswordVisible = !isPasswordVisible"
                        variant="outlined"
                        density="comfortable"
                        :rules="[requiredValidator, passwordValidator]"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.password_confirmation"
                        label="Password Confirmation"
                        :type="isPasswordConfirmVisible ? 'text' : 'password'"
                        :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
                        variant="outlined"
                        density="comfortable"
                        :rules="[
                          requiredValidator,
                          (value) => confirmedValidator(value, formData.value.password),
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-btn type="submit" block color="green-darken-3" class="signup white--text mb-2">
                    <router-link to="/" class="text-decoration-none">
                      <p class="text-center text-white">Sign up</p>
                    </router-link></v-btn
                  >
                  <router-link to="/" class="text-decoration-none">
                    <p class="text-center green--text">Already have an account?</p>
                  </router-link>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
