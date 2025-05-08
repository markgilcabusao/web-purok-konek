// stores/account.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccountStore = defineStore('account', () => {
  const fullName = ref('Jazzmher Osico')
  const email = ref('jazzkiddo@gmail.com')
  const profilePicture = ref('')

  function updateAccount(data) {
    fullName.value = data.fullName
    email.value = data.email
    profilePicture.value = data.profilePicture
  }

  return {
    fullName,
    email,
    profilePicture,
    updateAccount,
  }
})
