<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

const route = useRoute()
const router = useRouter()
const requestId = route.params.id
const goBack = () => router.back()

const requestDetails = ref(null)

const fetchRequestDetails = async () => {
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .eq('id', requestId)
    .single()

  if (error) {
    console.error('Failed to fetch request details:', error)
  } else {
    requestDetails.value = data
  }
}

onMounted(fetchRequestDetails)
</script>

<template>
  <v-app>
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

    <v-main class="main-page d-flex justify-center align-center">
      <v-container class="py-10">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="4" class="overview-card">
              <v-card-title class="text-h5 text-center">Request Details</v-card-title>
              <v-card-text v-if="requestDetails" class="text-left">
                <p><strong>Request Type:</strong> {{ requestDetails.request_type }}</p>
                <p><strong>Name:</strong> {{ requestDetails.name }}</p>
                <p><strong>Email:</strong> {{ requestDetails.email }}</p>
                <p><strong>Phone:</strong> {{ requestDetails.phone }}</p>
                <p><strong>Comment:</strong> {{ requestDetails.comment || 'No comment provided' }}</p>
                <p><strong>Submitted:</strong> {{ new Date(requestDetails.created_at).toLocaleString() }}</p>
              </v-card-text>
              <v-card-text v-else class="text-center">
                Loading request details...
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
