import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const profilePicture = ref('public/images/PictureNekss.jpg') // Default user picture
  const fullName = ref('Nikjhems Sereñina')
  const email = ref('nekjems.sereñina@gmail.com')
  const phone = ref('9123456789')
  const address = ref('P-1 Brgy.8 Baan KM-3, Butuan City,')

  // Update all profile details at once
  const updateProfile = (newProfile) => {
    fullName.value = newProfile.fullName || fullName.value
    email.value = newProfile.email || email.value
    phone.value = newProfile.phone || phone.value
    address.value = newProfile.address || address.value
  }

  // Update profile picture only
  const updatePicture = (newPicture) => {
    profilePicture.value = newPicture || profilePicture.value
  }

  return {
    profilePicture,
    fullName,
    email,
    phone,
    address,
    updateProfile,
    updatePicture,
  }
})
