<script setup>

import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()

// Simulated user data
const form = ref({
  fullName: 'Jazzmher Osico',
  email: 'jazzkiddo@gmail.com',
  password: '' // Add password field
})

const formRef = ref(null)
const isPasswordVisible = ref(false) // Reactive variable to toggle password visibility

const rules = {
  required: (v) => !!v || 'This field is required',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
}


function saveChanges() {
  if (formRef.value?.validate()) {
    console.log('Saved:', form.value)
    alert('Changes saved successfully!')
    router.push('/main') // Redirect to homepage or another route
  }
}
</script>

<template>
  <div class="account-settings">
    <v-card class="account-card">
      <v-card-title>
        <span class="text-h5">Account Settings</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="saveChanges" ref="formRef" lazy-validation>
          <v-text-field
            v-model="form.fullName"
            label="Full Name"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            outlined
            dense
          ></v-text-field>

          <v-btn color="green-darken-2" class="mt-4" type="submit">
            Save Changes
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.account-settings {
  background-color: var(--background-color, #f0f4f8);
  background-image: url('public/154085550_s.jpg'); /* Add the background image */
  background-size: cover; /* Ensure the image covers the entire background */
  background-position: center; /* Center the image */
  background-attachment: fixed; /* Make the background fixed */
  min-height: 100vh; /* Ensure the background covers the full height of the viewport */
  width: 100%; /* Ensure the background covers the full width of the viewport */
  display: flex; /* Use flexbox to center the content */
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
  padding: 20px; /* Add some padding for spacing */
}

.account-card {
  background-color: white; /* Set the card background to plain white */
  border-radius: 8px; /* Add rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  max-width: 600px; /* Limit the card width */
  width: 100%; /* Make the card responsive */
  padding: 20px; /* Add padding inside the card */
}
</style>