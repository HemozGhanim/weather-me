import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { weatherStore } from './weather'
import router from '@/router'

export const userLocationStore = defineStore('userLocation', () => {
  const userLatitude = ref(0)
  const userLongitude = ref(0)
  const { cookies } = useCookies()
  const Store = weatherStore()

  const getUserLocation = async () => {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then(async (result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(async function (position) {
            userLatitude.value = position.coords.latitude
            cookies.set('userLatitude', userLatitude.value.toString())
            userLongitude.value = position.coords.longitude
            cookies.set('userLongitude', userLongitude.value.toString())
            await Store.getWeather(userLatitude.value, userLongitude.value)
          })
        } else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            async function (position) {
              userLatitude.value = position.coords.latitude
              cookies.set('userLatitude', userLatitude.value.toString())
              userLongitude.value = position.coords.longitude
              cookies.set('userLongitude', userLongitude.value.toString())
              await Store.getWeather(userLatitude.value, userLongitude.value)
              router.push('/')
            },
            (error) => {
              console.error('Error getting user location:', error.message)
              router.push('/getlocation')
            }
          )
        } else {
          console.error('Geolocation permission denied')
          router.push('/getlocation')
        }
      })
    } else {
      console.error('Geolocation not supported')
    }
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(async function (position) {
    //     userLatitude.value = position.coords.latitude
    //     cookies.set('userLatitude', userLatitude.value.toString())
    //     userLongitude.value = position.coords.longitude
    //     cookies.set('userLongitude', userLongitude.value.toString())
    //     await Store.getWeather(userLatitude.value, userLongitude.value)
    //   })
    // } else {
    //   console.log('test')
    //   alert('Geolocation is not supported by this browser.')
    // }
  }

  return {
    getUserLocation,
    userLongitude,
    userLatitude
  }
})
