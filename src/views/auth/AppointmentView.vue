<script setup>

import { supabase } from '@/utils/supabase.js'
import { ref } from 'vue'
import { requiredValidator, emailValidator } from '@/utils/validator'
import { useRouter } from 'vue-router'

// Router instance
const router = useRouter()

// Form data
const date = ref('')
const time = ref('')
const submitted = ref(false)
const loading = ref(false)
const errorMessage = ref('')

// Validation rules
const requiredRule = (value) => !!value || 'This field is required.'

// Submit appointment to Supabase
const submitAppointment = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          date: date.value,
          time: time.value,
        },
      ])

    if (error) {
      throw error
    }

    submitted.value = true
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}

// Navigate to the main page
const goToMain = () => {
  router.push('/main')
}
</script>

<template>
  <v-responsive>
    <v-app class="main-page">
      <!-- Top Bar -->
      <v-app-bar color="green-darken-3" class="px-3">
        <v-btn icon @click="$router.back()" class="me-2" variant="text">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
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
      <div class="background">
        <div class="content text-center">
          <template v-if="!submitted">
            <h1>Appointment Schedule</h1>
            <p>Schedule your appointment with ease!</p>
            <form @submit.prevent="submitAppointment">
              <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" id="date" v-model="date" required />
              </div>
              <div class="form-group">
                <label for="time">Time:</label>
                <input type="time" id="time" v-model="time" required />
              </div>
              <v-btn
                type="submit"
                color="green-darken-3"
                class="text-white"
                :loading="loading"
              >
                Make an Appointment
              </v-btn>
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </form>
          </template>

          <template v-else>
            <div class="success-message">
              <div class="check-icon">
                <v-icon color="green-darken-2" size="48">mdi-check-circle</v-icon>
              </div>
              <h3 class="modern-heading">Your Appointment Request Has Been a Success!</h3>
              <p class="modern-subtitle">
                Thank you for submitting your form. We appreciate your time and effort in providing the necessary information.
              </p>
              <v-btn color="green-darken-3" class="white--text">
                <router-link to="/main" class="text-decoration-none text-white">
                  <h5 class="text-center">Back to Homepage</h5>
                </router-link>
              </v-btn>
            </div>
          </template>
        </div>
      </div>
    </v-app>
  </v-responsive>
</template>

<style scoped>
:root {
  --background-color-light: #ffffff;
  --background-color-dark: #121212;
  --text-color-light: #333333;
  --text-color-dark: #ffffff;
  --button-color-green: #4caf50;
  --button-hover-color-green: #388e3c;
  --button-color-blue: #2575fc;
  --button-hover-color-blue: #1a5bb8;
}

.appointment-view {
  font-family: Arial, sans-serif;
  text-align: center;
  color: var(--text-color-light);
  background-color: var(--background-color-light);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.background {
  background-color: inherit;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
}

.success-message {
  text-align: center;
  padding: 20px;
}

.check-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.modern-heading {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.modern-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 10px;
  color: inherit;
}

p {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: inherit;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: var(--background-color-light);
  color: var(--text-color-light);
}

.main-page {
  color: var(--text-color);
  background-color: var(--background-color);
  text-align: center;
  padding: 20px;
  background-image: url('/images/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.main-page[data-theme="dark"] {
  background-color: var(--background-color-dark);
  color: var(--text-color-dark);
}

.theme-toggle {
  background: var(--button-color-green);
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  transition: background 0.3s ease;
}

.theme-toggle:hover {
  background: var(--button-hover-color-green);
}

.header-icon {
  font-size: 1.5rem;
  color: var(--header-text-color);
  margin-right: 8px;
}
</style>