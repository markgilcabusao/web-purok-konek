<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Default profile picture
const defaultProfilePicture = 'public/Picturee.jpg'

// Simulated user data
const user = ref({
  profilePicture: 'public/Picturee.jpg',
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
  router.push('/edit-profile')
}
</script>

<template>
  <v-app class="main-page">
    <!-- Top Navbar with Logo -->
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
      <div class="my-profile">
        <v-container class="py-10">
          <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
              <v-card elevation="4" class="profile-card">
                <v-card-title class="text-h5 text-center">My Profile</v-card-title>
                <!-- Profile Picture -->
                <div class="text-center mb-4">
                  <v-avatar size="120" class="mx-auto">
                    <v-img :src="user.profilePicture" alt="Profile Picture"></v-img>
                  </v-avatar>
                </div>
                <v-card-text>
                  <div class="avatar-container text-center mb-4">
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
    </v-main>
  </v-app>
</template>

<style scoped>
.my-profile {
  background-color: var(--background-color, #f0f4f8);
  background-image: url('public/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.profile-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

.main-page {
  background-color: #fff;
  background-image: url('public/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
