import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// import { userLocationStore } from './location'
import { useCookies } from 'vue3-cookies'

export const weatherStore = defineStore('weatherStore', () => {
  const weather = ref<any>()
  // const locationStore = userLocationStore()
  const { cookies } = useCookies()
  const latitude = cookies.get('userLatitude')
  const longitude = cookies.get('userLongitude')

  const getWeather = () => {
    // const config = {
    //   method: 'get',
    //   url: `https://api.openweathermap.org/data/3.0/onecall?lat=${parseFloat(latitude)}&lon=${parseFloat(longitude)}&exclude=current&appid=753e76947b3fe09073506b55df5fe9ef`
    // }
    //http://api.weatherapi.com/v1/current.json?key=ba6ee5f12608467fb2410438240204&q=${parseFloat(latitude)},${parseFloat(longitude)}&lang=ar
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${parseFloat(latitude)}&lon=${parseFloat(longitude)}&units=metric&mode=json&appid=753e76947b3fe09073506b55df5fe9ef`
      )
      .then((response) => {
        weather.value = response.data
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // const geticons = () => {
  //   axios.get()
  // }
  return { weather, getWeather }
})
