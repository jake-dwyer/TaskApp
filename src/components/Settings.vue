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