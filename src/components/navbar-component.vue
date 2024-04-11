<script setup lang="ts">
import { ref, watch } from 'vue'
import logoImg from '../assets/logoImage/weather-logo.png'

const isDark = ref<boolean>()

const intervalID = setInterval(() => {
  localStorage.removeItem('theme')

  isDark.value =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
}, 500)

const toggle = () => {
  clearInterval(intervalID)
  isDark.value = !isDark.value
  if (isDark.value) {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
  } else {
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
  }
}

watch(isDark, (newVal) => {
  if (newVal) {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
  } else {
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
  }
})
</script>
<template>
  <header class="fixed top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex items-center p-2 rounded-full bg-white/20 dark:bg-black/20">
        <a href="#" class="-m-1.5 p-1.5">
          <img class="w-auto h-8" :src="logoImg" alt="" />
        </a>
        <span class="px-2 font-bold text-white text-small lg:text-2xl dark:text-teal-200"
          >Weather-Me</span
        >
      </div>
      <div class="lg:flex lg:flex-1 lg:justify-end">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" v-model="isDark" @click="toggle" />
          <div
            class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0  dark:bg-blue-400 peer-checked:after:transition peer-checked:after:ease-in-out peer-checked:after:duration-300 peer-checked:after:translate-x-full  rtl:peer-checked:after:-translate-x-full peer-checked:after:border-none white peer-checked:after:content-[url('https://cdn-icons-png.flaticon.com/16/702/702471.png')] peer-checked:after:bg-no-repeat peer-checked:after:invert peer-checked:after:-rotate-90 after:absolute peer-checked:after:top-0 after:top-0.5 after:start-[3px] after:border-gray-300 after:bg-yellow-500 peer-checked:after:bg-transparent after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
          ></div>
          <span class="text-lg font-bold tracking-wide text-white ms-3">{{
            isDark ? 'Dark' : 'light'
          }}</span>
        </label>
      </div>
    </nav>
  </header>
</template>
