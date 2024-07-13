<template>
  <button @click="toggleTheme">Toggle Theme</button>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    function toggleTheme() {
      store.commit('toggleTheme');
      document.body.style.backgroundColor = store.state.theme === 'dark' ? getComputedStyle(document.documentElement).getPropertyValue('--dark-background') : getComputedStyle(document.documentElement).getPropertyValue('--light-background');
    }

    return {
      toggleTheme
    };
  }
}
</script>

<style scoped>
@import '../assets/base.css';
</style>
