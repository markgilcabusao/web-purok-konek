import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const profilePicture = ref('public/Picturee.jpg')
  const fullName = ref('Jazzmher Osico')
  const email = ref('jazzkiddo@gmail.com')
  const phone = ref('9123456789')
  const address = ref('P-1 Brgy.8 Lapu-Lapu Butuan City, Agusan del Norte')

  const updateProfile = (newProfile) => {
    fullName.value = newProfile.fullName
    email.value = newProfile.email
    phone.value = newProfile.phone
    address.value = newProfile.address
  }

  const updatePicture = (newPicture) => {
    profilePicture.value = newPicture
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
