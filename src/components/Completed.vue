<template>
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
