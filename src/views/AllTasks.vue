<template>
  <!-- Render the TodoView component with an empty statusFilter prop, meaning it will show all tasks -->
  <todo-view :statusFilter="''" />
</template>

<script>
import TodoView from './Todo.vue';

export default {
  components: {
    TodoView
  }
}
</script>
