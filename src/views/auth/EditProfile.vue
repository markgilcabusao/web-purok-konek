<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  fullName: userStore.fullName,
  email: userStore.email,
  phone: userStore.phone,
  address: userStore.address,
})

const formRef = ref(null)
const showError = ref(false)
const errorMessage = ref('')

const requiredRule = (v) => !!v || 'This field is required'
const emailRule = (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
const phoneRule = (v) => /^[9]\d{9}$/.test(v) || 'Phone must start with 9 and be exactly 10 digits'

const saveChanges = () => {
  showError.value = false
  errorMessage.value = ''

  if (!formRef.value.validate()) {
    errorMessage.value = 'Please fill out all required fields.'
    showError.value = true
    return
  }

  userStore.updateProfile(form.value)

  alert('Profile updated successfully!')
  router.push('/my-profile')
}
</script>

<template>
  <v-app>
    <div class="main-page">
      <v-app-bar color="green-darken-3" class="px-3">
        <div class="d-flex align-center">
          <v-btn icon @click="router.back()" class="mr-2">
            <v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
          <v-img src="/PUROK-KONEK-LOGO-removebg-preview.png" width="40" height="40" class="mr-2"></v-img>
          <h2 class="mb-0 text-white">PUROK-KONEK</h2>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-container class="edit-profile-container py-10">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="4" class="edit-profile-card">
              <v-card-title class="text-h5 text-center">Edit Profile</v-card-title>
              <v-card-text>
                <v-form ref="formRef" @submit.prevent="saveChanges" lazy-validation>
                  <v-alert v-if="showError" type="error" variant="tonal" class="mb-4" dismissible>
                    {{ errorMessage }}
                  </v-alert>

                  <v-text-field v-model="form.fullName" label="Full Name" :rules="[requiredRule]" outlined dense />
                  <v-text-field v-model="form.email" label="Email" :rules="[requiredRule, emailRule]" outlined dense />
                  <v-text-field
                    v-model="form.phone"
                    label="Phone Number"
                    prefix="+63"
                    type="text"
                    placeholder="9XXXXXXXXX"
                    maxlength="10"
                    :rules="[requiredRule, phoneRule]"
                    outlined
                    dense
                  />
                  <v-textarea v-model="form.address" label="Address" :rules="[requiredRule]" outlined dense rows="3" />

                  <v-card-actions class="justify-center">
                    <v-btn color="green-darken-2" type="submit">Save Changes</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<style scoped>
.main-page {
  background-color: #fff;
  background-image: url('/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.edit-profile-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.edit-profile-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-app-bar {
  background-color: #2e7d32;
}

.d-flex {
  display: flex;
  align-items: center;
}

.mr-2 {
  margin-right: 10px;
}

.text-white {
  color: white;
}
</style>
