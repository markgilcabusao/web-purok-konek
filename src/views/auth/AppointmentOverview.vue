<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter to access Vue Router

// Simulated appointment data
const appointments = ref([
  {
    id: 1,
    title: 'Barangay Clearance Appointment',
    date: '2025-05-10',
    time: '10:00 AM',
  },
  {
    id: 2,
    title: 'Business Permit Application',
    date: '2025-05-12',
    time: '2:00 PM',
  },
  {
    id: 3,
    title: 'Residency Certificate Request',
    date: '2025-05-15',
    time: '9:00 AM',
  },
])

// Initialize router
const router = useRouter()

// Placeholder function for viewing appointment details
const viewDetails = (id) => {
  alert(`Viewing details for appointment ID: ${id}`)
}

// Function to go back to the previous page
const goBack = () => {
  router.back()
}
</script>

<template>
  <v-app class="main-page">
    <!-- Top Navbar with Logo -->
    <v-app-bar color="green-darken-3" class="px-3">
      <div class="d-flex align-center">
        <!-- Back Button -->
        <v-btn icon @click="goBack" class="mr-2">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>

        <!-- Logo -->
        <v-img
          src="/PUROK-KONEK-LOGO-removebg-preview.png"
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
      <div class="appointment-overview">
        <v-container class="py-10">
          <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
              <v-card elevation="4" class="overview-card">
                <v-card-title class="text-h5 text-center">Appointment Overview</v-card-title>
                <v-card-text>
                  <v-list dense>
                    <v-list-item v-for="appointment in appointments" :key="appointment.id">
                      <v-list-item-content>
                        <v-list-item-title>
                          <strong>{{ appointment.title }}</strong>
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
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.appointment-overview {
  background-color: var(--background-color, #f0f4f8);
  background-image: url('/154085550_s.jpg'); /* Background image */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.overview-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.main-page {
  color: #fff;
  background-color: #fff;
  background-image: url('/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}

.v-app-bar {
  z-index: 10; /* Ensures the navbar stays on top */
}
</style>
