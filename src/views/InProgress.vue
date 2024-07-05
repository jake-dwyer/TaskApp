<template>
  <!-- Render the TodoView component with an 'In progress' statusFilter prop, meaning it will show in progress tasks -->
  <todo-view :statusFilter="'In progress'" />
</template>

<script>
import TodoView from './Todo.vue';

export default {
  components: {
    TodoView
  }
}
</script>
