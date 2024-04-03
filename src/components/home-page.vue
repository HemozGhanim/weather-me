<script setup lang="ts">
import { ref, computed } from 'vue'
// import { userLocationStore } from '../stores/location'
import { weatherStore } from '../stores/weather'
import navBar from './navbar-component.vue'
import headerImg from '../assets/images/bg-header.jpg'
import weatherImg from '../assets/images/weather-bg.jpg'
const Store = weatherStore()
const dataDone = ref(false)
let weather_obj = computed(() => {
  return Store.weatherObj
})
const timeNow = new Date(Date.now())
const celsiusDegree = ref(true)
// const celsiusDegree = () => {}
setTimeout(() => {
  if (Store.doneData) {
    dataDone.value = true
  } else {
    dataDone.value = false
  }
}, 5000)
</script>

<template>
  <div
    v-if="!Store.doneData"
    class="flex items-center justify-center w-screen h-screen text-center text-white bg-indigo-900"
  >
    loading...
  </div>
  <div
    v-else
    class="relative flex flex-wrap items-center content-start justify-center w-screen h-screen overflow-y-scroll align-middle isolate"
  >
    <navBar class="w-full" />
    <div
      class="flex flex-wrap items-center justify-center w-screen h-screen after:content-[''] after:w-full after:h-full after:absolute after:bg-slate-900/80 after:brightness-50 after:z-10"
      :style="{ background: `url(${weatherImg}) no-repeat` }"
      style="background-size: cover; background-position: 50% 10%"
    >
      <div
        class="z-20 flex flex-wrap justify-start w-1/3 overflow-hidden bg-white rounded-lg aspect-square"
      >
        <div
          class="relative flex flex-wrap items-center justify-center w-full overflow-hidden text-center content-evenly h-3/4"
        >
          <div class="flex flex-wrap items-stretch justify-center w-full h-full p-2 content-evenly">
            <span
              class="flex flex-wrap justify-center w-full text-2xl font-semibold tracking-wide text-white"
              >{{ weather_obj.name }}
              <span class="w-full text-sm font-semibold tracking-wide text-white">{{
                weather_obj.weather[0].main
              }}</span>
            </span>
            <!-- <span class="self-start w-full text-xl font-semibold tracking-wide text-white"
            >clody</span
          > -->
            <!-- <span class="self-center w-full text-2xl font-semibold tracking-wide text-white"
              >icon</span
            > -->
            <img
              :src="`https://openweathermap.org/img/wn/${weather_obj.weather[0].icon}@4x.png`"
              alt=""
            />
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
            <div class="flex self-end justify-between w-full text-white">
              <span>{{ timeNow.toDateString() }}</span>
              <span>test2</span>
            </div>
          </div>

          <img
            :src="headerImg"
            alt=""
            class="absolute object-cover object-center w-full h-full -z-10 brightness-50"
          />
        </div>
        <div class="h-1/4">test 2</div>
      </div>
      <!-- <div class="w-full text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-6xl">
          Data to enrich your online business
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-900 dark:text-gray-400">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
          Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p> 

        <div class="flex items-center justify-center mt-10 gap-x-6">
          <button
            @click="weather_Store.getWeather"
            class="rounded-md bg-indigo-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Weather
          </button>
        </div>
      </div> -->
    </div>
    <!-- <weatherComponent /> -->
  </div>
</template>
