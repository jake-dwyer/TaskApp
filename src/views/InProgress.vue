<template>
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
