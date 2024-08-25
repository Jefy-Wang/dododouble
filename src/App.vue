<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

</script>

<template>
  <AppHeader></AppHeader>

  <RouterView></RouterView>

  <AppFooter></AppFooter>
</template>
