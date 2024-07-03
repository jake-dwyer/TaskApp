<template>
  <div class="heading">
    <TitleIcon />
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import TitleIcon from './icons/TitleCheck.vue'

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.heading {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top:  3.75rem;
    margin-left: 7.5rem;
}
</style>
