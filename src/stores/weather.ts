import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'

export const weatherStore = defineStore('weatherStore', () => {
  const weatherObj = ref<any>()
  const doneData = ref(false)
  const { cookies } = useCookies()
  const latitude = cookies.get('userLatitude')
  const longitude = cookies.get('userLongitude')
  const SRC = ref('')
  const allCountries = ref<any>()
  const country = ref<any>()
  const countrySRC = ref('')

  const getWeather = async () => {
    const config = {
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${parseFloat(latitude)}&lon=${parseFloat(longitude)}&units=metric&mode=json&appid=${import.meta.env.VITE_APP_API_KEY}`
    }
    await axios(config)
      .then(async (response) => {
        weatherObj.value = response.data
        await getWeatherImg(weatherObj.value.weather[0].description)
        await getCountryImage(weatherObj.value.sys.country)
        doneData.value = true
      })
      .catch((error) => {
        doneData.value = false
        console.log(error)
      })
  }
  const getWeatherImg = async (weather_condition: string) => {
    const config = {
      method: 'get',
      url: `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${weather_condition}&client_id=${import.meta.env.VITE_APP_UNSPLASH_TOKEN}&orientation=landscape`
    }
    await axios(config)
      .then((response) => {
        const data = response.data
        const randomNumber = ref(Math.floor(Math.random() * data.results.length))
        SRC.value = data.results[randomNumber.value].urls.regular
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getCountryName = async (country_code: any) => {
    const config = {
      method: 'get',
      url: 'https://restcountries.com/v3.1/all'
    }
    await axios(config)
      .then((response) => {
        allCountries.value = response.data
        country.value = allCountries.value.find((country: any) => {
          return country.cca2 === country_code
        })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
  const getCountryImage = async (counter_Name: any) => {
    await getCountryName(counter_Name)
    const config = {
      method: 'get',
      url: `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${country.value.name.common}&client_id=${import.meta.env.VITE_APP_UNSPLASH_TOKEN}&orientation=landscape`
    }
    await axios(config)
      .then((response) => {
        const data = response.data
        const randomNumber = ref(Math.floor(Math.random() * data.results.length))
        countrySRC.value = data.results[randomNumber.value].urls.regular
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  return { weatherObj, SRC, countrySRC, doneData, getWeather, getWeatherImg, getCountryImage }
})
