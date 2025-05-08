<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'

const route = useRoute()
const router = useRouter()

const appointmentId = route.params.id
const appointment = ref(null)
const loading = ref(true)
const error = ref(null)

const goBack = () => router.back()

const fetchAppointment = async () => {
  loading.value = true
  error.value = null

  const { data, error: fetchError } = await supabase
    .from('appointments')
    .select('id, date, time')
    .eq('id', appointmentId)
    .single()

  if (fetchError) {
    console.error(fetchError)
    error.value = 'Failed to fetch appointment details.'
  } else {
    appointment.value = data
  }

  loading.value = false
}

onMounted(fetchAppointment)
</script>

<template>
  <v-app>
    <v-app-bar color="green-darken-3" flat app class="px-4">
      <div class="d-flex align-center">
        <v-btn icon @click="goBack" class="me-2" variant="text">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <v-img src="public/images/PUROK-KONEK-LOGO-removebg-preview.png" alt="Logo" width="40" height="40" class="me-2" contain />
        <h2 class="text-white mb-0">PUROK-KONEK</h2>
      </div>
    </v-app-bar>

    <v-main class="main-page d-flex justify-center align-center">
      <v-container class="py-10">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="4" class="overview-card">
              <v-card-title class="text-h5 text-center">Appointment Details</v-card-title>

              <v-card-text class="text-center" v-if="loading">
                <v-progress-circular indeterminate color="green-darken-2" />
              </v-card-text>

              <v-card-text class="text-center" v-else-if="error">
                <v-alert type="error" variant="tonal" color="error">{{ error }}</v-alert>
              </v-card-text>

              <v-card-text class="text-center" v-else>
                <p><strong>Appointment ID:</strong> {{ appointment.id }}</p>
                <p><strong>Date:</strong> {{ appointment.date }}</p>
                <p><strong>Time:</strong> {{ appointment.time }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.main-page {
  background-image: url('public/images/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding-top: 64px;
}
.overview-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.v-app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
