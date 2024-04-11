<script setup lang="ts">
import { userLocationStore } from '../stores/location'

const locationStore = userLocationStore()

const getLocation = () => {
  locationStore.getUserLocation()
}
</script>
<template>
  <div
    class="flex flex-wrap items-center content-center justify-center w-full h-screen text-center text-white"
  >
    <span class="w-[50%] sm:w-[30%] md:w-[20%] lg:w-[20%] xl:w-[20%]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#ffffff">
        <path
          d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
        />
      </svg>
    </span>
    <h1 class="w-full my-5 italic text-gray-400">
      Sorry, You Are Disable Your Location.
      <span class="inline-block text-xl text-white underline underline-offset-4"
        >Please Re-allow Your Location</span
      >
    </h1>
    <router-link
      to="/"
      @click="getLocation()"
      class="p-4 font-medium text-white bg-blue-700 rounded-full"
      >Get Your Location</router-link
    >
  </div>
</template>
