<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const pendingRequests = ref([
  { id: 1, title: 'Barangay Clearance Request', date: '2025-05-01' },
  { id: 2, title: 'Business Permit Application', date: '2025-05-03' },
  { id: 3, title: 'Indigency Certificate Request', date: '2025-05-05' },
])

const router = useRouter()
const goBack = () => router.back()
const viewDetails = (id) => router.push({ name: 'request-details', params: { id } })
</script>

<template>
  <v-app>
    <!-- Fixed App Bar -->
    <v-app-bar color="green-darken-3" flat app class="px-4">
      <div class="d-flex align-center">
        <v-btn icon @click="goBack" class="me-2" variant="text">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>

        <v-img
          src="/images/PUROK-KONEK-LOGO-removebg-preview.png"
          alt="Logo"
          width="40"
          height="40"
          class="me-2"
          contain
        />

        <h2 class="text-white mb-0">PUROK-KONEK</h2>
      </div>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="main-page d-flex justify-center align-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="4" class="overview-card">
              <v-card-title class="text-h5 text-center">Pending Requests</v-card-title>
              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="request in pendingRequests"
                    :key="request.id"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <strong>{{ request.title }}</strong>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Submitted on: {{ request.date }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn small color="green-darken-2" @click="viewDetails(request.id)">
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
  background-image: url('/images/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding-top: 64px; /* Offset for fixed navbar */
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
