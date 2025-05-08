<script setup>

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const drawer = ref(false) // Controls the visibility of the sidebar

const user = ref({
  initials: "JO", 
  fullName: "Nikjhems Sereñina", 
  email: "nekjems.sereñina@gmail.com", 
});

const features = ref([
  {
    title: "Community News",
    description: "Stay updated with the latest news in your community.",
    icon: "fa-solid fa-newspaper", 
  },
  {
    title: "Event Management",
    description: "Organize and participate in local events effortlessly.",
    icon: "fa-solid fa-calendar",
  },
  {
    title: "Resource Sharing",
    description: "Share and access resources within your community.",
    icon: "fa-solid fa-share-alt",
  },
]);

const notifications = ref([
  { id: 1, message: "Your appointment has been successfully scheduled!" },
]);

const hasNewNotification = ref(false);

setTimeout(() => {
  notifications.value.push({ id: 3, message: "Your request for a Barangay Clearance is being processed." });
  hasNewNotification.value = true;
}, 5000);

function resetNotification() {
  hasNewNotification.value = false;
}

function goToAccountSettings() {
  router.push('/account-settings') 
}

function handleLogout() {
  console.log('User logged out')
  router.push('/') 
}
</script>

<template>
  <v-app :theme="theme">
    <div :class="['main-page', theme === 'dark' ? 'dark-mode' : '']">
      <!-- Sidebar -->
<v-navigation-drawer v-model="drawer" app color="green-darken-3">
  <v-list>
    <v-list-item>
      <v-list-item-title class="text-h5 text-white">Dashboard</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>

    <v-list-item>
      <router-link to="/main" class="nav-link">
        <v-icon left class="mr-2">mdi-home</v-icon>
        <v-list-item-title>Home</v-list-item-title>
      </router-link>
    </v-list-item>

    <v-list-item>
      <router-link to="/my-profile" class="nav-link">
        <v-icon left class="mr-2">mdi-account</v-icon>
        <v-list-item-title>My Profile</v-list-item-title>
      </router-link>
    </v-list-item>

    <v-list-item>
      <router-link to="/appointment-overview" class="nav-link">
        <v-icon left class="mr-2">mdi-calendar-check</v-icon>
        <v-list-item-title>Appointment Overview</v-list-item-title>
      </router-link>
    </v-list-item>

    <v-list-item>
      <router-link to="/pending-requests" class="nav-link">
        <v-icon left class="mr-2">mdi-clock-outline</v-icon>
        <v-list-item-title>Pending Requests</v-list-item-title>
      </router-link>
    </v-list-item>
  </v-list>
</v-navigation-drawer>

      <!-- App Bar -->
      <v-app-bar color="green-darken-3" class="px-3">
        <v-btn icon @click="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <div class="d-flex align-center">
          <v-img
            src="images/PUROK-KONEK-LOGO-removebg-preview.png"
            alt="Purok-Konek Logo"
            width="40"
            height="40"
            class="mr-2"
          ></v-img>
          <h2 class="mb-0 text-white">PUROK-KONEK</h2>
        </div>
        <v-spacer></v-spacer>

        <!-- Notification Button -->
<v-menu offset-y @open="resetNotification">
  <template #activator="{ props }">
    <v-btn v-bind="props" icon>
      <v-badge
        color="red"
        overlap
        dot
        :content="notifications.length"
        v-if="hasNewNotification"
      >
        <v-icon
          :class="['bell-icon', { 'notify': hasNewNotification }]"
          :color="hasNewNotification ? 'red' : 'white'"
        >
          mdi-bell
        </v-icon>
      </v-badge>
      <v-icon
        v-else
        :color="hasNewNotification ? 'red' : 'white'"
      >
        mdi-bell
      </v-icon>
    </v-btn>
  </template>
  <v-list>
    <v-list-item v-for="notification in notifications" :key="notification.id">
      <v-list-item-title>{{ notification.message }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>

        <!-- User Menu -->
<v-menu min-width="200px">
  <template v-slot:activator="{ props }">
    <v-btn icon v-bind="props">
      <v-avatar color="green" size="45">
        <v-img src="images/PictureNekss.jpg" alt="User Picture"></v-img>
      </v-avatar>
    </v-btn>
  </template>
  <v-card>
    <v-card-text>
      <div class="mx-auto text-center">
        <v-avatar color="brown" size="100">
          <v-img src="images/PictureNekss.jpg" alt="User Picture"></v-img>
        </v-avatar>
        <h3>{{ user.fullName }}</h3>
        <p class="text-caption mt-1">
          {{ user.email }}
        </p>
        <v-divider class="my-3"></v-divider>
        <v-btn variant="text" rounded @click="goToAccountSettings">
          <v-icon class="mr-2">mdi-account-cog</v-icon>
          Account Settings
        </v-btn>
        <v-divider class="my-3"></v-divider>
        <v-btn variant="text" rounded @click="handleLogout">
          <v-icon class="mr-2">mdi-logout</v-icon>
          Sign Out
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</v-menu>
      </v-app-bar>

      <!-- Main Content -->
      <section class="intro">
        <br><br><br>
        <v-row cols="12" md="6" class="text-center text-md-left">
          <v-img src="images/PUROK-KONEK-LOGO-removebg-preview.png" width="300" height="300"></v-img>
        </v-row>
        <br><br>
        <h1>Welcome to Purok-Konek</h1>
        <br>
        <p>
          Your one-stop platform for connecting with your community.<br>
          Stay informed, collaborate, and grow together.
        </p>
        <router-link to="/requests" class="text-decoration-none">
          <button class="text-center green--text">Go to Request Form</button>
        </router-link>
      </section>

      <section class="features">
        <br><br><br>
        <h1>Our Features</h1>
        <br>
        <div class="feature-cards">
          <div class="card" v-for="feature in features" :key="feature.title">
            <i :class="feature.icon" class="feature-icon"></i>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </v-app>
</template>

<style scoped>
:root {
  --background-color: #ffffff;
  --text-color: #333333;
  --header-background-color: #4caf50;
  --header-text-color: #ffffff;
  --card-background-color: #f9f9f9;
  --card-border-color: #dddddd;
  --footer-text-color: #777777;
  --box-shadow-color: rgba(0, 0, 0, 0.1);
}

.dark-mode {
  --background-color: #121212;
  --text-color: #ffffff;
  --header-background-color: #333333;
  --header-text-color: #ffffff;
  --card-background-color: #1e1e1e;
  --card-border-color: #444444;
  --footer-text-color: #aaaaaa;
  --box-shadow-color: rgba(0, 0, 0, 0.5);
}

.main-page {
  color: var(--text-color);
  background-color: var(--background-color);
  background-image: url('images/154085550_s.jpg'); /* Add the background image */
  background-size: cover; /* Ensure the image covers the entire background */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  text-align: center;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.clickable {
  cursor: pointer;
}

.v-list-item {
  cursor: pointer;
}

.v-btn {
  margin-left: 10px;
}

.header-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%); 
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: #ffffff; 
  font-family: 'Montserrat', sans-serif; 
  font-weight: 700;
}

.header-icon {
  font-size: 1.5rem;
  color: #ffffff; 
  margin-right: 8px;
}

h1 {
  font-size: 2rem;
  color: #ffffff; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.header p {
  margin: 5px 0 0;
  font-size: 1.2rem;
}

.content {
  margin: 20px 0;
}

h1, h3 {
  font-family: 'Poppins', sans-serif; 
  font-weight: 600; 
  color: var(--header-text-color);
}

h1 {
  font-size: 2.5rem;
  text-transform: uppercase;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333333; 
}

.intro {
  margin-bottom: 40px;
  margin-bottom: 40px;
  text-align: center;
}

.intro p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.intro-border {
  border: 1px solid #dddddd; 
  border-radius: 2px; 
  padding: 15px;
  background-color: #f9f9f9; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  margin-bottom: 20px;
  transition: box-shadow 0.3s;
}

.intro-border p {
  font-family: Arial, sans-serif;
  color: #333333;
}

.intro button {
  background-color: #4caf50; 
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.intro button:hover {
  background-color: #45a049; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
  transform: translateY(-2px); 
}

.features {
  margin-top: 20px;
}

.feature-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.feature-icon {
  font-size: 2rem;
  color: #4caf50; 
  margin-bottom: 10px;
}

.card {
  background-color: #f9f9f9; 
  border: 1px solid #dddddd; 
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px); 
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); 
}

.card h3 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333333; 
}

.card  {
  font-family: Arial, sans-serif;
  font-size: 1rem;
  color: #555555; 
}

.bell-icon {
  transition: transform 0.3s ease;
}

.bell-icon.notify {
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0%, 100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
  75% {
    transform: rotate(-15deg);
  }
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  color: black !important;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 6px;
}

.nav-link:hover {
  background-color: #c8e6c9;
  transform: translateX(5px);
}

.router-link-exact-active {
  background-color: #a5d6a7;
  border-radius: 6px;
}

.v-list-item-title {
  color: black !important;
}

.v-icon {
  color: black !important;
}
</style>