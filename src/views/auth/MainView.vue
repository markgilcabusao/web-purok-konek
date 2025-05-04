<script setup>
import { ref } from 'vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
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



</script>
<template>
  <div :class="['main-page', theme === 'dark' ? 'dark-mode' : '']">
      <section class="intro">
        <br><br><br>
        <h1>Welcome to Purok-Konek</h1>
        <br>
        <div class="intro-border">
          <p>
            Your one-stop platform for connecting with your community.<br> Stay informed, collaborate, and grow together.
          </p>
        </div>
        <router-link to="/request" class="text-decoration-none">
          <button class="text-center green--text">Go to Request Form</button>
        </router-link>
      </section>
      <section class="features">
        <h3>Our Features</h3>
        <div class="feature-cards">
          <div class="card" v-for="feature in features" :key="feature.title">
            <i :class="feature.icon" class="feature-icon"></i>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>
      <v-responsive>
    <v-app :theme="theme">
      <!-- Top Bar -->
      <v-app-bar color="green-darken-3" class="px-3">
        <v-spacer><h2 class="text-start">PUROK-KONEK</h2></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text=""
          slim
          @click="toggleTheme"
        />
      </v-app-bar>
    </v-app> 
  </v-responsive>
  </div>
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
  text-align: center;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}


.v-app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
  border-radius: 25px;
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

.card p {
  font-family: Arial, sans-serif;
  font-size: 1rem;
  color: #555555; 
}

</style>