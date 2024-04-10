<script setup lang="ts">
import { ref, computed, onBeforeUpdate, onUpdated, onBeforeMount, watchEffect } from 'vue'
import { weatherStore } from '../stores/weather'
import navBar from './navbar-component.vue'
import headerImg from '../assets/images/bg-header.jpg'
import weatherImg from '../assets/images/weather-bg.jpg'
import { userLocationStore } from '../stores/location'
const location_Store = userLocationStore()
const Store = weatherStore()
const dataDone = ref(true)
let weather_obj: any = computed(() => {
  return Store.weatherObj
})
const timer = ref<NodeJS.Timeout>()
const timerCountry = ref<NodeJS.Timeout>()
const celsiusDegree = ref(true)
const imageTransition = ref<'enter' | 'leave'>('enter')
const imageClasses = computed(() => {
  return [
    'absolute object-cover object-center w-full h-full -z-10 brightness-50 transition-opacity ease-in-out duration-300',
    imageTransition.value === 'enter' ? 'opacity-100' : 'opacity-0'
  ]
})

onBeforeMount(async () => {
  location_Store.getUserLocation()
  await Store.getWeather()
})
watchEffect(() => {
  if (Store.doneData) {
    setTimeout(() => {
      dataDone.value = false
    }, 1000)
  } else {
    dataDone.value = true
  }
})
onBeforeUpdate(() => {
  clearInterval(timer.value)
  clearInterval(timerCountry.value)
})
onUpdated(() => {
  if (Store.doneData) {
    timer.value = setInterval(() => {
      Store.getWeatherImg(weather_obj.value.weather[0].description)
    }, 20000)
    timerCountry.value = setInterval(() => {
      Store.getCountryImage(weather_obj.value.sys.country)
    }, 30000)
  }
})
</script>
<template>
  <div
    v-if="dataDone"
    class="flex items-center justify-center w-screen h-screen text-center text-white bg-indigo-900"
  >
    <svg
      class="w-5 h-5 mr-2 animate-spin iconsvg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#ffffff"
        d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
      />
    </svg>
    loading...
  </div>
  <div
    v-else
    class="relative flex flex-wrap items-center content-start justify-center w-screen h-screen overflow-y-scroll align-middle isolate"
  >
    <navBar class="w-full" />
    <div
      class="flex flex-wrap items-center justify-center w-screen h-screen after:content-[''] after:w-full after:h-full after:absolute after:bg-slate-900/80 after:brightness-50 after:z-10"
      :style="{ background: `url(${Store.countrySRC || weatherImg}) no-repeat` }"
      style="background-size: cover"
    >
      <div
        class="z-20 bg-black rounded-lg max-w-[80%] min-w-[80%] md:min-w-[80%] lg:min-w-[70%] xl:min-w-[70%] overflow-hidden"
      >
        <div class="relative flex flex-wrap justify-center w-full text-center content-evenly">
          <div class="flex flex-col content-around w-full h-full p-5 justify-normal flex-nowrap">
            <span
              class="flex flex-wrap justify-center w-full text-2xl font-semibold tracking-wide text-white"
              >{{ weather_obj.name }}
              <img
                :src="`https://flagcdn.com/${weather_obj.sys.country.toLowerCase()}.svg`"
                width="30"
                height="30"
                class="mx-2 rounded-full"
              />
              <span class="w-full text-sm font-semibold tracking-wide text-white">{{
                weather_obj.weather[0].main
              }}</span>
            </span>
            <div class="flex justify-center w-full">
              <img
                :src="`https://openweathermap.org/img/wn/${weather_obj.weather[0].icon}@4x.png`"
                alt=""
              />
            </div>
            <span
              class="flex flex-row items-center justify-center w-full text-5xl font-semibold tracking-wide text-white flex-nowrap"
              ><span class="px-2" v-if="celsiusDegree">{{
                Math.floor(weather_obj.main.feels_like)
              }}</span>
              <span class="px-2" v-else>{{
                Math.floor(Math.floor(weather_obj.main.feels_like) * (9 / 5) + 32)
              }}</span>
              <span class="flex flex-col">
                <button
                  class="flex-1 inline-block px-1 my-1 text-xl rounded-lg bg-white/5 hover:bg-white/20"
                  :class="celsiusDegree == true ? 'text-white' : 'text-white/50'"
                  @click="celsiusDegree = true"
                >
                  °c
                </button>
                <button
                  class="flex-1 inline-block px-1 text-xl rounded-lg bg-white/5 hover:bg-white/20"
                  :class="celsiusDegree == false ? 'text-white' : 'text-white/50'"
                  @click="celsiusDegree = false"
                >
                  °f
                </button>
              </span>
            </span>
            <div class="flex justify-between w-full text-white">
              <span
                >{{
                  new Date(weather_obj.dt * 1000)
                    .toLocaleString('en-us', { weekday: 'long' })
                    .toString()
                    .split(' ')[0]
                }}
                - {{ new Date(weather_obj.dt * 1000).toLocaleDateString() }}</span
              >
              <span>{{ new Date(weather_obj.dt * 1000).toLocaleTimeString() }}</span>
            </div>
          </div>
          <Transition name="fade">
            <img
              v-if="Store.SRC"
              :src="Store.SRC ? Store.SRC : headerImg"
              alt=""
              :class="imageClasses"
            />
          </Transition>
        </div>
        <div
          class="relative flex flex-row flex-wrap items-center content-center w-full p-2 bg-white h-1/4 dark:bg-orange-700"
        >
          <div class="flex flex-row flex-wrap items-center content-center w-full dark:text-white">
            <div class="text-center basis-1/2">
              <span class="font-bold tracking-wider">Humidity</span>:
              <span class="font-medium">{{ weather_obj.main.humidity }}%</span>
            </div>
            <div class="text-center basis-1/2">
              <span class="font-bold tracking-wider">Wind</span>:
              <span class="font-medium">{{ parseInt(weather_obj.wind.speed) }} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.iconsvg {
  color: #ffffff !important;
}
</style>
