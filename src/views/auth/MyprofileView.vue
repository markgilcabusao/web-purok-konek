<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Default profile picture
const defaultProfilePicture = 'https://via.placeholder.com/100'

// Simulated user data
const user = ref({
  profilePicture: '',
  fullName: 'Jazzmher Osico',
  email: 'jazzkiddo@gmail.com',
  phone: '9123456789',
  address: 'P-1 Brgy.8 Lapu-Lapu Butuan City, Agusan del Norte',
})

const router = useRouter()

// Placeholder function for uploading a profile picture
const uploadProfilePicture = () => {
  alert('Profile picture upload functionality is not implemented yet.')
}

// Navigate to the Edit Profile page
const editProfile = () => {
  router.push('/edit-profile') // Replace with the actual route for editing the profile
}
</script>

<template>
  <div class="my-profile">
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="4" class="profile-card">
            <v-card-title class="text-h5 text-center">My Profile</v-card-title>
            <v-card-text>
              <div class="avatar-container text-center mb-4">
                <!-- Profile Picture -->
                <v-avatar size="100" class="mx-auto">
                  <v-img :src="user.profilePicture || defaultProfilePicture" alt="Profile Picture"></v-img>
                </v-avatar>
                <!-- Change Picture Button -->
                <v-btn
                  small
                  color="primary"
                  class="change-picture-btn"
                  @click="uploadProfilePicture"
                >
                  Change Picture
                </v-btn>
              </div>

              <!-- Profile Information -->
              <v-list dense>
                <v-list-item>
                  <v-list-item-title><strong>Full Name:</strong> {{ user.fullName }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title><strong>Email:</strong> {{ user.email }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title><strong>Phone:</strong> +63{{ user.phone }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title><strong>Address:</strong> {{ user.address }}</v-list-item-title>
                </v-list-item>
              </v-list>

              <!-- Edit Profile Button -->
              <v-card-actions class="justify-center">
                <v-btn color="green-darken-2" @click="editProfile">
                  Edit Profile
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.my-profile {
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

.profile-card {
  background-color: white; /* Set the card background to plain white */
  border-radius: 8px; /* Add rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
}

.avatar-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.change-picture-btn {
  margin-top: 8px;
  font-size: 12px;
}

</style>