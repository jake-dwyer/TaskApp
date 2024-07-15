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
      <th scope="col" class="labels text-center"></th>
    </tr>
  </thead>
  <tbody>
    <!-- For loop to render taks in table based on selected view. -->
    <tr v-for="task in filteredTasks" :key="task.id" >
      <th style="width: 240px">
        <!-- On task name click call editTask -->
        <span class="taskName" @click="openEditModal(task)"> 
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
        <div class="text-center" @click="deleteTask(task.id)">
          <span>
            <Trash />
          </span>
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
    <edit-task :isVisible="showEditModal" :task="selectedTask" @update:isVisible="showEditModal = $event" @task-updated="updateTask"></edit-task>
  </div>
</div>
</template>

<script setup>
import Trash from './icons/Trash.vue';
</script>

<script>
import { mapMutations, mapState } from 'vuex';
import CreateTask from './CreateTask.vue';
import EditTask from './EditTask.vue';
import DateMixin from '../mixins/dateMixin.js';
import SortDueDate from '../mixins/sortDueDateMixin.js'

export default {
  mixins: [DateMixin, SortDueDate],

  components: {
    CreateTask,
    'edit-task': EditTask
  },

  data() {
    return {
      showModal: false,
      showEditModal: false,
      selectedTask: null,
      dueDateFilter: '',
      sortAscending: true
    };
  },

  props: {
    statusFilter: String
  },

  watch: {
    taskCount(newCount) {
      localStorage.setItem('taskCount', newCount.toString());
    }
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
    openEditModal(task) {
      this.selectedTask = task;
      this.showEditModal = true;
    },
    updateTask(updatedTask) {
        console.log("Updating task in Vuex:", updatedTask);
        this.$store.commit('updateTask', updatedTask);
        this.showEditModal = false;
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

.table {
  background-color: var(--color-background);
  border-color: var(--color-grid-lines);
}

.table th, .table td {
  background-color: inherit;
  border-color: var(--color-grid-lines);
}

.labels {
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.taskName {
  cursor: pointer;
  padding: 4px 4px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.taskName:hover {
  background-color: var(--color-grid-lines);
}

span {
  color: var(--color-text-primary);
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
  color: var(--color-text-idle);
  background-color: var(--color-highlight-idle);
}

.inProgress {
  color: var(--color-text-progress);
  background-color: var(--color-highlight-progress);
}

.complete {
  color: var(--color-text-complete);
  background-color: var(--color-highlight-complete);
}

.dueDate {
  font-size: 14px;
}

.textField {
  margin-left: 8.75rem;
  margin-right: 8.75rem;
}

button {
  color: var(--color-text-CTA);
  font-weight: 600;
  background-color: var(--color-background);
  border: none;
}

.pointer {
  cursor: pointer;
}

@media (max-width: 776px) {
  .tablePosition {
    max-width: 90%;
    margin: auto;
  }

  .table, .table th, .table td {
    font-size: 14px;
  }

  .labels {
    font-size: 12px;
  }

  .textField {
    margin-left: 1rem; 
    margin-right: 1rem;
  }

  button {
    padding: 12px 24px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  select {
    padding: 1.5px 4px 1.5px 4px;
  }

  .table th:nth-child(1), 
  .table td:nth-child(1) {
    width: 50%;
  }

  .table th:nth-child(2), 
  .table td:nth-child(2) {
    width: 15%;
  }

  .table th:nth-child(3),  
  .table td:nth-child(3) {
    width: 25%;
  }

  .table th:nth-child(4), 
  .table td:nth-child(4) {
    width: 10%;
  }
}
</style>