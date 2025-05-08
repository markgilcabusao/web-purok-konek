<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

const appointments = ref([])
const loading = ref(true)
const error = ref(null)

const router = useRouter()
const goBack = () => router.back()
const viewDetails = (id) => router.push({ name: 'appointment-details', params: { id } })

const fetchAppointments = async () => {
  loading.value = true
  error.value = null

  const { data, error: fetchError } = await supabase
    .from('appointments')
    .select('id, date, time')

  if (fetchError) {
    console.error(fetchError)
    error.value = 'Failed to fetch appointments.'
  } else {
    appointments.value = data
  }

  loading.value = false
}

onMounted(fetchAppointments)
</script>

<template>
  <v-app>
    <v-app-bar color="green-darken-3" flat app class="px-4">
      <div class="d-flex align-center">
        <v-btn icon @click="goBack" class="me-2" variant="text">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <v-img src="images/PUROK-KONEK-LOGO-removebg-preview.png" alt="Logo" width="40" height="40" class="me-2" contain />
        <h2 class="text-white mb-0">PUROK-KONEK</h2>
      </div>
    </v-app-bar>

    <v-main class="main-page d-flex justify-center align-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="4" class="overview-card">
              <v-card-title class="text-h5 text-center">Appointment Overview</v-card-title>
              <v-card-text>
                <v-alert type="error" v-if="error" color="error" variant="tonal">{{ error }}</v-alert>
                <v-progress-circular indeterminate color="green-darken-2" v-if="loading" class="d-flex mx-auto" />
                <v-list dense v-if="!loading && !error">
                  <v-list-item v-for="appointment in appointments" :key="appointment.id">
                    <v-list-item-content>
                      <v-list-item-title>
                        <strong>Appointment #{{ appointment.id }}</strong>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Date: {{ appointment.date }} | Time: {{ appointment.time }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn small color="green-darken-2" @click="viewDetails(appointment.id)">
                        View Details
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
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
  background-image: url('images/images/154085550_s.jpg');
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
