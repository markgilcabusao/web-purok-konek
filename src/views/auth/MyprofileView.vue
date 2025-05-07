<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Simulated user data
const user = ref({
  profilePicture: 'public/Picturee.jpg',
  fullName: 'Jazzmher Osico',
  email: 'jazzkiddo@gmail.com',
  phone: '9123456789',
  address: 'P-1 Brgy.8 Lapu-Lapu Butuan City, Agusan del Norte',
})

const router = useRouter()
const fileInput = ref(null)

const uploadProfilePicture = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      user.value.profilePicture = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const editProfile = () => {
  router.push('/edit-profile')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar color="green-darken-3" class="px-4" flat>
      <v-btn icon @click="goBack" class="me-2" variant="text">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <!-- Logo + Title wrapper -->
      <div class="d-flex align-center">
        <v-img
          src="public/PUROK-KONEK-LOGO-removebg-preview.png"
          alt="Purok-Konek Logo"
          width="40"
          height="40"
          class="me-2"
          contain
        ></v-img>
        <h2 class="text-white font-weight-bold mb-0">PUROK-KONEK</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Profile Content -->
    <v-main>
      <div class="my-profile">
        <v-container class="py-10">
          <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
              <v-card elevation="4" class="profile-card">
                <v-card-title class="text-h5 text-center">My Profile</v-card-title>

                <div class="text-center my-4">
                  <v-avatar size="120" class="mx-auto">
                    <v-img :src="user.profilePicture" alt="Profile Picture" />
                  </v-avatar>
                </div>

                <div class="text-center mb-4">
                  <v-btn small color="primary" @click="triggerFileInput">
                    Change Picture
                  </v-btn>
                  <input
                    type="file"
                    accept="image/*"
                    ref="fileInput"
                    style="display: none"
                    @change="uploadProfilePicture"
                  />
                </div>

                <v-card-text>
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
  background-image: url('public/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 20px;
}

.profile-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.text-center {
  text-align: center;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-4 {
  margin-bottom: 16px;
}

.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
