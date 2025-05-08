<script setup>
import { supabase } from '@/utils/supabase.js'
import { ref } from 'vue'
import { requiredValidator, emailValidator } from '@/utils/validator'
import { useRouter } from 'vue-router'

const router = useRouter()

const theme = ref('light')
const requestType = ref('')
const comment = ref('')
const name = ref('')
const email = ref('')
const phone = ref('')
const submitted = ref(false)
const loading = ref(false)
const form = ref(null)

// Alert state
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('error') // 'error', 'success', etc.

const requestTypes = [
  'Barangay Clearance',
  'Residency Certificate',
  'Business Permit',
  'Indigency Certificate',
  'Complaint Filing',
  'Infrastructure Report',
  'Other'
]

// Validation rules
const emailRule = emailValidator
const requiredRule = requiredValidator

const phoneRule = (value) => {
  const regex = /^[9]\d{9}$/
  return regex.test(value) || "Phone number must start with 9 and be exactly 10 digits."
}

const formatFullName = () => {
  name.value = name.value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Fetch user data from Supabase
const getUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error.message)
    return
  }

  const metadata = data.user.user_metadata
  name.value = metadata.full_name || ''
  email.value = metadata.email || ''
  phone.value = metadata.phone || ''
}

// Submit request to Supabase with form validation
const submitRequest = async () => {
  const result = await form.value?.validate()

  if (!result?.valid) {
    alertMessage.value = 'Please fill out all required fields before submitting.'
    alertType.value = 'error'
    showAlert.value = true
    return
  }

  loading.value = true
  showAlert.value = false

  try {
    const { data, error } = await supabase
      .from('requests')
      .insert([{
        name: name.value,
        email: email.value,
        phone: phone.value,
        request_type: requestType.value,
        comment: comment.value
      }])

    if (error) {
      alertMessage.value = `Supabase error: ${error.message}`
      alertType.value = 'error'
      showAlert.value = true
      return
    }

    console.log('Request submitted:', data)
    submitted.value = true
  } catch (err) {
    console.error('Unexpected error:', err)
    alertMessage.value = 'An unexpected error occurred. Please try again.'
    alertType.value = 'error'
    showAlert.value = true
  } finally {
    loading.value = false
  }
}

// Navigate to appointment page after submission
const goToAppointment = () => {
  if (submitted.value) {
    router.push('/appointment')
  }
}

// Fetch user data on component mount
getUser()
</script>

<template>
  <v-responsive>
    <v-app :theme="theme" class="main-page">
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
              <v-card class="mx-auto mt-6" elevation="4">
                <v-card-title class="text-h4 text-center py-4 bg-green-darken-1">
                  Request Form
                </v-card-title>

                <v-card-text class="pt-4">
                  <div v-if="!submitted">
                    <!-- Alert for errors -->
                    <v-alert
                      v-if="showAlert"
                      :type="alertType"
                      variant="tonal"
                      closable
                      color="error"
                      class="mb-4"
                      @click:close="showAlert = false"
                    >
                      <v-icon start icon="mdi-alert-circle" class="mr-2" />
                      <strong>Ooops!</strong> {{ alertMessage }}
                    </v-alert>

                    <v-form ref="form" @submit.prevent="submitRequest">
                      <!-- Personal Information -->
                      <h3 class="text-subtitle-1 mb-3">Personal Information</h3>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="name"
                            label="Full Name"
                            variant="outlined"
                            :rules="[requiredRule]"
                            @input="formatFullName"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="email"
                            label="Email"
                            variant="outlined"
                            :rules="[requiredRule, emailRule]"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="phone"
                            label="Phone Number"
                            type="text"
                            prefix="+63"
                            variant="outlined"
                            :rules="[requiredRule, phoneRule]"
                            maxlength="10"
                            placeholder="9XXXXXXXXX"
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
                        :rules="[requiredRule]"
                      ></v-textarea>

                      <!-- Submit Button -->
                      <v-card-actions class="justify-center">
                        <v-btn
                          type="submit"
                          color="green-darken-2"
                          size="large"
                          block
                          :loading="loading"
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
                    <p class="mb-6">
                      Your request for <strong>{{ requestType }}</strong> has been received. We will get back to you shortly.
                    </p>
                    <v-btn block color="green-darken-3" class="signup white--text mb-2" @click="goToAppointment">
                      Set Your Appointment
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
  background-image: url('public/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
