import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { weatherStore } from './weather'

export const userLocationStore = defineStore('userLocation', () => {
  const userLatitude = ref(0)
  const userLongitude = ref(0)
  const { cookies } = useCookies()
  const Store = weatherStore()

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        userLatitude.value = position.coords.latitude
        cookies.set('userLatitude', userLatitude.value.toString())
        userLongitude.value = position.coords.longitude
        cookies.set('userLongitude', userLongitude.value.toString())
        await Store.getWeather(userLatitude.value, userLongitude.value)
      }),
        () => {
          alert('Please allow location sharing to continue.')
        }
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  return {
    getUserLocation,
    userLongitude,
    userLatitude
  }
})
