<script setup>
  import { ref } from 'vue'
  
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
  
  // Placeholder function for viewing appointment details
  const viewDetails = (id) => {
    alert(`Viewing details for appointment ID: ${id}`)
  }
  </script>

<template>
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
  </template>
  
  <style scoped>
  .appointment-overview {
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
  
  .overview-card {
    background-color: white; /* Set the card background to plain white */
    border-radius: 8px; /* Add rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  }
  </style>