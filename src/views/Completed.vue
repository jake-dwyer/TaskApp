<template>
  <!-- Render the TodoView component with a 'Complete' statusFilter prop, meaning it will show completed tasks -->
  <todo-view :statusFilter="'Complete'" />
</template>

<script>
import TodoView from './Todo.vue';

export default {
  components: {
    TodoView
  }
}
</script>
