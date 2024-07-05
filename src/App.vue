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
  <!-- Rendering the router-view component to display the matched component for the current route.
    The :key attribute forces the view to re-render when the route changes. -->
  <router-view :key="$route.fullPath" />
</template>
