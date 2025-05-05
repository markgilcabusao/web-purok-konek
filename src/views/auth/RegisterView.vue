<script setup>

import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validator';

import { ref } from 'vue';
import AlertNotification from '@/components/common/AlertNotification.vue';
import { supabase, formActionDefault } from '@/utils/supabase.js';

// Theme toggle functionality
const theme = ref('light');
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

// Form reference and data
const refVForm = ref(null);
const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
};
const formData = ref({ ...formDataDefault });
const formAction = ref({ ...formActionDefault });

// Password visibility toggles
const isPasswordVisible = ref(false);
const isPasswordConfirmVisible = ref(false);

// Registration function
const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

 
  const { data, error } = await supabase.auth.signUp({
  email: formData.value.email,
  password: formData.value.password,
  options: {
    data: {
      firstname: formData.value.firstname,
      lastname: formData.value.lastname,
    }
  }
})

if (error) {
  console.log(error);
  formAction.value.formErrorMessage = error.message;
  formAction.value.formStatus = error.status;
} else if (data) {
  console.log(data);
  formAction.value.formSuccessMessage = 'Registration successful!';
  refVForm.value.reset() // Reset the form after successful registration
}
  formAction.value.formProcess = false
}

// Form submission handler
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme" class="main-page">
      <!-- Top Bar -->
      <v-app-bar color="green-darken-3" class="px-3">
        <div class="d-flex align-center">
          <v-img
            src="PUROK-KONEK-LOGO.jpg"
            alt="Purok-Konek Logo"
            width="40"
            height="40"
            class="mr-2"
          ></v-img>
          <h2 class="mb-0 text-white">PUROK-KONEK</h2>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text=""
          slim
          @click="toggleTheme"
        />
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
             <AlertNotification :form-success-message="formAction.formSuccessMessage" 
             :form-error-message="formAction.formErrorMessage">
            </AlertNotification>

              <!-- Registration Form -->
              <v-card class="mx-auto pa-6" elevation="8" rounded="lg">
                <v-card-title class="text-h4 text-center">
                  Create a new <br />account
                </v-card-title>
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

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.password"
                        prepend-inner-icon="🔒"
                        label="Password"
                        variant="outlined"
                        density="comfortable"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="isPasswordVisible = !isPasswordVisible"
                        :rules="[requiredValidator, passwordValidator]"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.password_confirmation"
                        label="Password Confirmation"
                        variant="outlined"
                        density="comfortable"
                        :type="isPasswordConfirmVisible ? 'text' : 'password'"
                        :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
                        :rules="[requiredValidator, confirmedValidator(formData.password_confirmation, formData.password)]"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-btn
                    type="submit"
                    block
                    color="green-darken-3"
                    class="signup white--text mb-2"
                    :disabled="formAction.formProcess"
                    :loading="formAction.formProcess"
                  >
                    <p class="text-center text-white">Sign up</p>
                  </v-btn>
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

<style scoped>
.main-page {
  color: var(--text-color);
  background-color: var(--background-color);
  padding: 20px;
  /* Updated to use relative path from public folder */
  background-image: url('public/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Keeps the image fixed when scrolling */
  min-height: 100vh; /* Ensures the background covers the full height */
}

</style>
