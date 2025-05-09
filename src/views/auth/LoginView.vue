<script setup>
import { supabase } from '@/utils/supabase.js';
import { ref } from 'vue';
import { requiredValidator, emailValidator } from '@/utils/validator'
import { useRouter } from 'vue-router'
import AlertNotification from '@/components/common/AlertNotification.vue'

const router = useRouter();

const formDataDefault = {
  email: '',
  password: '',
};

const formData = ref({ ...formDataDefault })
const formAction = ref({
  formProcess: false,
  formErrorMessage: '',
  formSuccessMessage: '',
});

const isPasswordVisible = ref(false)
const refVForm = ref()

const onSubmit = async () => {
  formAction.value = { formProcess: true, formErrorMessage: '', formSuccessMessage: '' }

  
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    });

    if (error) {
      console.error(error)
      formAction.value.formErrorMessage = error.message
    } else if (data) {
      console.log(data)
      formAction.value.formSuccessMessage = 'Login successful!'
      router.replace('/main'); // Redirect to the main page
    }
    refVForm.value.reset() 

    formAction.value.formProcess = false

  }

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
            src="/images/PUROK-KONEK-LOGO-removebg-preview.png"
            alt="Purok-Konek Logo"
            width="40"
            height="40"
            class="mr-2"
          ></v-img>
          <h2 class="mb-0 text-white">PUROK-KONEK</h2>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <v-container class="fill-height">
          <v-row align="center" justify="center 12">
            <!-- Left Section -->
            <v-col cols="12" md="6" class="text-center text-md-left">
              <v-img src="/images/PUROK-KONEK-LOGO-removebg-preview.png" width="400" height="350"></v-img>
              <h1 class="purokkonek-title text-white">PUROK-KONEK</h1>
              <p class="purok-subtitle"></p>
            </v-col>

            <!-- Right Section -->
            <v-col cols="12" md="4">
              <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

                <h1 class="text-center">Welcome back!</h1>
                <p class="text-center">We're so excited to see you again!</p>
                <AlertNotification :form-success-message="formAction.formSuccessMessage" 
             :form-error-message="formAction.formErrorMessage">
            </AlertNotification>
                <br />

                <!-- Success Message -->
                <v-alert
                  v-if="formAction.formSuccessMessage"
                  type="success"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ formAction.formSuccessMessage }}
                </v-alert>

                <!-- Error Message -->
                <v-alert
                  v-if="formAction.formErrorMessage"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ formAction.formErrorMessage }}
                </v-alert>

                <v-form ref="refVForm" @submit.prevent="onFormSubmit">
                  <v-text-field
                    v-model="formData.email"
                    density="compact"
                    label="Email"
                    placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    :rules="[requiredValidator, emailValidator]"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.password"
                    prepend-inner-icon="mdi-lock-outline"
                    label="Password"
                    placeholder="Enter your password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    density="compact"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    variant="outlined"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    :rules="[requiredValidator]"
                  ></v-text-field>

                  <v-btn
                    type="submit"
                    block
                    color="green-darken-3"
                    class="signup white--text mb-2"
                    :disabled="formAction.formProcess"
                    :loading="formAction.formProcess"
                  >
                    Log in
                  </v-btn>
                  <router-link to="/register" class="text-decoration-none">
                    <p class="text-center green--text">Create new account</p>
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

.main-page {
  color: #fff;
  background-color: #fff;
  background-image: url('/images/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Keeps the image fixed when scrolling */
  min-height: 100vh; /* Ensures the background covers the full height */
}
</style>
