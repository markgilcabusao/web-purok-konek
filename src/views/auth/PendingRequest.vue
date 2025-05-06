<script setup>
import { ref } from 'vue'

// Simulated pending request data
const pendingRequests = ref([
  {
    id: 1,
    title: 'Barangay Clearance Request',
    date: '2025-05-01',
  },
  {
    id: 2,
    title: 'Business Permit Application',
    date: '2025-05-03',
  },
  {
    id: 3,
    title: 'Indigency Certificate Request',
    date: '2025-05-05',
  },
])

// Placeholder function for viewing request details
const viewDetails = (id) => {
  alert(`Viewing details for request ID: ${id}`)
}
</script>

<template>
    <div class="pending-requests">
      <v-container class="py-10">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="4" class="requests-card">
              <v-card-title class="text-h5 text-center">Pending Requests</v-card-title>
              <v-card-text>
                <v-list dense>
                  <v-list-item v-for="request in pendingRequests" :key="request.id">
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
    </div>
  </template>
  
  <style scoped>
  .pending-requests {
    background-color: var(--background-color, #f0f4f8);
    background-image: url('public/154085550_s.jpg'); /* Add the background image */
    background-size: cover; /* Ensure the image covers the entire background */
    background-position: center; /* Center the image */
    background-attachment: fixed; /* Make the background fixed */
    min-height: 100vh; /* Ensure the background covers the full height of the viewport */
    display: flex; /* Use flexbox to center the content */
    justify-content: center; /* Horizontally center the content */
    align-items: center; /* Vertically center the content */
    padding: 20px; /* Add some padding for spacing */
  }
  
  .requests-card {
    background-color: white; /* Set the card background to plain white */
    border-radius: 8px; /* Add rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  }
  </style>