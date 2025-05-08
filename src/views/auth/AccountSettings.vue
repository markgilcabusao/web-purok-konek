<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'

const router = useRouter()
const store = useAccountStore()

const goBack = () => router.back()

const form = ref({
  fullName: store.fullName,
  email: store.email,
  profilePicture: store.profilePicture
})

const formRef = ref(null)
const profilePicturePreview = ref(store.profilePicture || '')

const rules = {
  required: (v) => !!v || 'This field is required',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
}

function handlePictureChange(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      profilePicturePreview.value = reader.result
      form.value.profilePicture = reader.result
    }
    reader.readAsDataURL(file)
  }
}

async function saveChanges() {
  const valid = await formRef.value?.validate()
  if (valid) {
    store.updateAccount(form.value)
    router.push('/main')
  } else {
    alert('Please fix the validation errors.')
  }
}
</script>

<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar color="green-darken-3" class="px-4" flat>
      <v-btn icon @click="goBack" class="me-2" variant="text">
        <v-icon color="white">mdi-arrow-left</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <v-img
          src="/images/PUROK-KONEK-LOGO-removebg-preview.png"
          alt="Logo"
          width="40"
          height="40"
          class="me-2"
        />
        <h2 class="text-white font-weight-bold mb-0">PUROK-KONEK</h2>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Main content -->
    <v-main class="account-settings">
      <v-card class="account-card">
        <v-card-title>
          <span class="text-h5">Account Settings</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" lazy-validation>
            <div class="profile-picture-section">
              <img
                :src="profilePicturePreview || 'https://via.placeholder.com/150'"
                alt="Profile Picture"
                class="profile-picture-preview"
              />
              <v-btn color="blue" class="mt-2" @click="$refs.fileInput.click()">
                Change Picture
              </v-btn>
              <input
                type="file"
                ref="fileInput"
                class="hidden"
                accept="image/*"
                @change="handlePictureChange"
              />
            </div>

            <v-text-field
              v-model="form.fullName"
              label="Full Name"
              :rules="[rules.required]"
              outlined
              dense
            />

            <v-text-field
              v-model="form.email"
              label="Email"
              :rules="[rules.required, rules.email]"
              outlined
              dense
            />

            <v-btn color="green-darken-2" class="mt-4" @click="saveChanges">
              Save Changes
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<style scoped>
.account-settings {
  background-image: url('/images/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 20px 20px;
}

.account-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  padding: 20px;
}

.profile-picture-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.profile-picture-preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}

.hidden {
  display: none;
}

.v-app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>