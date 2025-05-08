<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'

const router = useRouter()
const store = useAccountStore()

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
  <div class="account-settings">
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
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            outlined
            dense
          ></v-text-field>

          <v-btn color="green-darken-2" class="mt-4" @click="saveChanges">
            Save Changes
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.account-settings {
  background-color: var(--background-color, #f0f4f8);
  background-image: url('public/154085550_s.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
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
</style>
