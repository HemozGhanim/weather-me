import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// import { userLocationStore } from './location'
import { useCookies } from 'vue3-cookies'

// interface weatherObj_body {
//   coord: {
//     lon: number
//     lat: number
//   }
//   weather: [
//     {
//       id: number
//       main: string
//       description: string
//       icon: string
//     }
//   ]
//   base: string
//   main: {
//     temp: number
//     feels_like: number
//     temp_min: number
//     temp_max: number
//     pressure: number
//     humidity: number
//     sea_level: number
//     grnd_level: number
//   }
//   visibility: number
//   wind: {
//     speed: number
//     deg: number
//     gust: number
//   }
//   rain: {
//     '1h': number
//   }
//   clouds: {
//     all: number
//   }
//   dt: number
//   sys: {
//     type: number
//     id: number
//     country: string
//     sunrise: number
//     sunset: number
//   }
//   timezone: number
//   id: number
//   name: string
//   cod: number
// }

export const weatherStore = defineStore('weatherStore', () => {
  const weatherObj = ref<any>()
  const doneData = ref(false)
  // const locationStore = userLocationStore()
  const { cookies } = useCookies()
  const latitude = cookies.get('userLatitude')
  const longitude = cookies.get('userLongitude')

  const getWeather = async () => {
    // const config = {
    //   method: 'get',
    //   url: `https://api.openweathermap.org/data/3.0/onecall?lat=${parseFloat(latitude)}&lon=${parseFloat(longitude)}&exclude=current&appid=753e76947b3fe09073506b55df5fe9ef`
    // }
    //http://api.weatherapi.com/v1/current.json?key=ba6ee5f12608467fb2410438240204&q=${parseFloat(latitude)},${parseFloat(longitude)}&lang=ar
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${parseFloat(latitude)}&lon=${parseFloat(longitude)}&units=metric&mode=json&appid=753e76947b3fe09073506b55df5fe9ef`
      )
      .then((response) => {
        weatherObj.value = response.data
        doneData.value = true
      })
      .catch((error) => {
        doneData.value = false
        console.log(error)
      })
  }
  // const geticons = () => {
  //   axios.get()
  // }
  return { weatherObj, doneData, getWeather }
})
