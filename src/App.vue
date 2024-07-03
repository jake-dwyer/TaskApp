<script setup>
import Title from './components/Title.vue'
import Nav from './components/Nav.vue'
import ToDoApp from './components/Todo.vue'
</script>

<template>
  <header>
    <Title msg="Todo" />
  </header>
  <Nav />
  <router-view :key="$route.fullPath" />
</template>
