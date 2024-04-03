<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { userLocationStore } from '../stores/location'
import { weatherStore } from '../stores/weather'
import homePage from '../components/home-page.vue'

const location_Store = userLocationStore()
const Store = weatherStore()
onBeforeMount(() => {
  location_Store.getUserLocation()
  Store.getWeather()
})
</script>

<template>
  <homePage />
</template>
