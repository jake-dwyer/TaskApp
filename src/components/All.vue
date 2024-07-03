<template>
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
