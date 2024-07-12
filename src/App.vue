<template>
  <div :class="$store.state.theme">
    <header>
      <Title msg="To-do" />
    </header>
    <Nav />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import Title from './components/Title.vue';
import Nav from './components/Nav.vue';

const store = useStore();

onMounted(() => {
  store.dispatch('initializeTheme');
});
</script>