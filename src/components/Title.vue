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
@import '../assets/base.css';
.heading {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top:  3.75rem;
    margin-left: 7.5rem;
}

h1 {
    color: var(--color-text-primary);
    font-size: 32px;
    font-weight: 600;
    margin-top: 6px;
  }

@media (max-width: 768px) {
    .heading {
        margin-left: 0;
        justify-content: center;
        margin-top: 2rem; 
    }

    h1 {
        font-size: 28px;
        text-align: center;
    }
}
</style>
