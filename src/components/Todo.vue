<template>
<!-- Creating Table -->
<div class="tablePosition">
  <table class="table">
  <thead>
    <tr>
    <!-- Column Heads -->
      <th scope="col" class="labels">Task</th>
      <th scope="col" class="labels">Status</th>
      <th scope="col" class="labels" @click="handleDueDateSort">Due</th>
      <th scope="col" class="labels text-center">#</th>
    </tr>
  </thead>
  <tbody>
    <!-- For loop to render taks in table based on selected view. -->
    <tr v-for="task in filteredTasks" :key="task.id">
      <th style="width: 240px">
        <!-- On task name click call editTask -->
        <span class="pointer">
          {{ task.name }}
        </span>
      </th>
      <td style="width: 240px">
        <select v-model="task.status" @change="updateStatus(task)" 
                  :class="{'complete' : task.status === '⦁︎ Complete',
                          'idle' : task.status === '⦁︎ Idle',
                          'inProgress' : task.status === '⦁︎ In progress'}">
            <option value="⦁︎ Idle">⦁︎ Idle</option>
            <option value="⦁︎ In progress">⦁︎ In progress</option>
            <option value="⦁︎ Complete">⦁︎ Complete</option>
        </select>
      </td>
      <td style="width: 240px">
        <span class="dueDate">
        {{ formatDate(task.dueDate) }}
        </span>
      </td>
      <td style="width: 120px">
        <!-- On Trash icon click call delete task. -->
        <div class="text-center" @click="deleteTask(task)">
          <span class="fa fa-trash"></span>
        </div>
      </td>
    </tr>
  </tbody>
  </table>
</div>

<div class="textField">
  <div class="d-flex">
    <button @click="showModal = true">+ Create a new task</button>
    <create-task :isVisible="showModal" :taskCount="taskCount" @update:isVisible="showModal = $event" @task-created="addTask"></create-task>
  </div>
</div>
</template>


<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import CreateTask from './CreateTask.vue';
import DateMixin from '../mixins/dateMixin.js';
import SortDueDate from '../mixins/sortDueDateMixin.js'

export default {
  mixins: [DateMixin, SortDueDate],

  components: {
    CreateTask
  },
  data() {
    return {
      showModal: false,
      dueDateFilter: '',
      sortAscending: true
    };
  },
  props: {
    statusFilter: String
  },
  computed: {
    ...mapState(['taskCount']),
    filteredTasks() {
      let tasks = this.$store.getters.filteredTasks(this.statusFilter);
      return this.sortTasksByDueDate(tasks, this.sortAscending);
    }
  },
  methods: {
    ...mapMutations([
      'addTask', 
      'deleteTask',
      'updateTaskStatus'
    ]),
    handleDueDateSort() {
      this.sortedTasks = this.sortTasksByDueDate(this.sortedTasks);
    },
    editTask(task) {
      // Logic for editing a task
    },
    updateStatus(task) {
      this.updateTaskStatus({ taskId: task.id, newStatus: task.status });
      this.$store.dispatch('saveTasks');
    },
    getNextStatus(currentStatus) {
      const statuses = ['⦁︎ Complete', '⦁︎ Idle', '⦁︎ In progress'];
      let index = statuses.indexOf(currentStatus);
      return statuses[(index + 1) % statuses.length];
    }
  },
  mounted() {
    this.$store.dispatch('fetchTasks');
    console.log('Tasks to render:', this.filteredTasks);
  }
};
</script>

<style scoped>
@import '../assets/base.css';
.tablePosition {
  margin-left: 8.75rem;
  margin-right: 8.75rem;
}

.labels {
  color: var(--text-secondary);
  font-family: 'Helvetica Neue';
  font-size: 14px;
  font-weight: 500;
}

select {
  appearance: none;
  border: none;
  border-radius: 4px;
  padding: 1.5px 4px 1.5px 4px;
  font-size: 14px;
  cursor: pointer;
  -webkit-appearance: none;
}

.idle {
  color: var(--text-idle);
  background-color: var(--highlight-idle);
}

.inProgress {
  color: var(--text-progress);
  background-color: var(--highlight-progress);
}

.complete {
  color: var(--text-complete);
  background-color: var(--highlight-complete);
}

.dueDate {
  font-size: 14px;
}

.textField {
  margin-left: 8.75rem;
  margin-right: 8.75rem;
}

button {
  color: var(--text-CTA);
  font-weight: 600;
  background-color: #fff;
  border: none;
}

.pointer {
  cursor: pointer;
}
</style>