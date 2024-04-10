import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'

export const userLocationStore = defineStore('userLocation', () => {
  const userLatitude = ref(0)
  const userLongitude = ref(0)
  const { cookies } = useCookies()

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        userLatitude.value = position.coords.latitude
        cookies.set('userLatitude', userLatitude.value.toString())
        userLongitude.value = position.coords.longitude
        cookies.set('userLongitude', userLongitude.value.toString())
      }),
        () => {
          alert('Please allow location sharing to continue.')
        }
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  return {
    getUserLocation
  }
})
