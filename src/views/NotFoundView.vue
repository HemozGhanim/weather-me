<script setup lang="ts">
import errorImg from '../assets/images/weather-bg.jpg'
</script>
<template>
  <div
    class="relative flex flex-wrap items-center justify-center w-screen h-screen text-center text-white before:content-[''] before:w-screen before:h-screen before:absolute before:left-0 before:top-0 before:bg-black/50 before:z-10"
    :style="{ background: `url(${errorImg}) no-repeat` }"
    style="background-size: cover"
  >
    <div
      class="z-20 relative flex flex-wrap items-center content-center justify-center w-screen h-screen after:content-['404'] after:absolute after:text-[300px] after:text-white/20 after:-z-10"
    >
      <h1 class="w-full my-2 text-2xl font-bold">Not Found</h1>
      <p class="w-full my-2 italic font-light text-gray-200">
        Oops, We Couldn't Find This Page , Try Again
      </p>
      <RouterLink to="/" class="p-2 my-2 font-medium text-white bg-orange-600 rounded-full"
        >Back To Home</RouterLink
      >
    </div>
  </div>
</template>
