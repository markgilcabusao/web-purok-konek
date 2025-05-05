<script setup>
import { ref } from 'vue'

const theme = ref('light')
const requestType = ref('')
const comment = ref('')
const name = ref('')
const email = ref('')
const emailRule = (value) => value.includes('@') || 'Email must contain @'
const phone = ref('')
const submitted = ref(false)
const loading = ref(false)

const requestTypes = [
  'Barangay Clearance',
  'Residency Certificate',
  'Business Permit',
  'Indigency Certificate',
  'Complaint Filing',
  'Infrastructure Report',
  'Other'
]

function submitRequest() {
  loading.value = true
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    submitted.value = true
    console.log({
      name: name.value,
      email: email.value,
      phone: phone.value,
      requestType: requestType.value,
      comment: comment.value
    })
  }, 1500)
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme" class="main-page">
      <!-- Top Bar -->
      <v-app-bar color="green-darken-3" class="px-3">
  <div class="d-flex align-center">
    <v-img
      src="public/PUROK-KONEK-LOGO-removebg-preview.png"
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
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6 text-center">
              <v-card class="mx-auto mt-6" elevation="4">
                <v-card-title class="text-h4 text-center py-4 bg-green-darken-1">
                  Request Form
                </v-card-title>
                
                <v-card-text class="pt-4">
                  <div v-if="!submitted">
                    <v-form @submit.prevent="submitRequest">
                      <!-- Personal Information -->
                      <h3 class="text-subtitle-1 mb-3">Personal Information</h3>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="name"
                            label="Full Name"
                            variant="outlined"
                            required
                            :rules="[v => !!v || 'Name is required']"
                          ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" md="6">
                        <v-text-field
                        v-model="email"
                        label="Email"
                        variant="outlined"
                        required
                        :rules="[emailRule]"
                        ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="phone"
                            label="Phone Number"
                            type="number"
                            prefix="+63"
                            variant="outlined"
                            required
                            :rules="[v => !!v || 'Phone number is required']"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-divider class="my-4"></v-divider>
                      
                      <!-- Request Type Selection -->
                      <h3 class="text-subtitle-1 mb-3">Request Details</h3>
                      <v-select
                        v-model="requestType"
                        :items="requestTypes"
                        label="Select Request Type"
                        variant="outlined"
                        required
                        :rules="[v => !!v || 'Request type is required']"
                        class="mb-4"
                      ></v-select>
                      
                      <!-- Comment Textarea -->
                      <v-textarea
                        v-model="comment"
                        label="Additional Comments"
                        placeholder="Please provide details about your request..."
                        variant="outlined"
                        rows="4"
                        auto-grow
                        class="mb-4"
                        :rules="[v => !!v || 'Please provide details about your request']"
                      ></v-textarea>
                      
                      <!-- Submit Button -->
                      <v-card-actions class="justify-center">
                        <v-btn
                          type="submit"
                          color="green-darken-2"
                          size="large"
                          block
                          :loading="loading"
                          :disabled="!requestType || !comment || !name || !email || !phone"
                        >
                          SUBMIT REQUEST
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </div>
                  
                  <!-- Success Message -->
                  <div v-else class="text-center py-8">
                    <v-icon color="green" size="64" class="mb-4">mdi-check-circle</v-icon>
                    <h2 class="text-h5 mb-2">Request Submitted Successfully!</h2>
                    <p class="mb-6">Your request for <strong>{{ requestType }}</strong> has been received. We will get back to you shortly.</p>
                    <v-btn type="submit" block color="green-darken-3" class="signup white--text mb-2">
                  <router-link to="/appointment" class="text-decoration-none">
                    <p class="text-center text-white">Set Your Appointment</p>
                  </router-link>
                </v-btn>
                  </div>
                </v-card-text>
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