<template>
<!-- Creating Table -->
<div class="tablePosition">
  <table class="table">
  <thead>
    <tr>
    <!-- Column Heads -->
      <th scope="col" class="labels">Task</th>
      <th scope="col" class="labels">Status</th>
      <th scope="col" class="labels text-center">#</th>
    </tr>
  </thead>
  <tbody>
    <!-- For loop to render taks in table based on selected view. -->
    <tr v-for="task in filteredTasks" :key="task.id">
      <th style="width: 240px">
        <!-- On task name click call editTask -->
        <span class="pointer" @click="editTask(task)">
          {{ task.name }}
        </span>
      </th>
      <td style="width: 120px">
        <!-- On task status click call updateStatus -->
        <span class="pointer" @click="updateStatus(task)">
          <!-- Realistically <text> should be changed. -->
          <!-- Categorizing status based on task.status. If task.status is 'InProgress', then we render 'In progress'. -->
          <text :class="{'complete' : task.status === 'Complete',
                         'idle' : task.status === 'Idle',
                         'inProgress' : task.status === 'In progress'}">
            {{ task.status }}
          </text>
        </span>
      </td>
      <td>
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
    <!-- Binds the input to the 'task' data property. On Enter key press, call submit. -->
    <input v-model="task" type="text" placeholder="+ Create a new task" class="form-control" @keyup.enter="submit">
  </div>
</div>
</template>


<script>
export default {
  // Define data properties
  data() {
    return {
      task: '',
      // On click of a created task name, this will populate to modify the task name. 
      editedTask: null,
      // On click of created task status, we increment to the following task based on index in the 'statusOptions' array.
      selectedStatus: '',
      statusOptions: ['Idle', 'In progress', 'Complete'],
      // Instead of selecting tasks by index, we assign it an 'id' based on when it is created. 
      taskCount: 0,
      tasks: []
    }
  },

  created() {
    // Initialize the tasks array by loading saved tasks from localStorage, or set to an empty array if no tasks are found.
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];  
    this.taskCount = localStorage.getItem('taskCount') || 0;
  },

  watch: {
    tasks: {
      handler(newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      },
      deep: true
    },
    // Add this watcher for taskCount
    taskCount(newCount) {
      localStorage.setItem('taskCount', newCount.toString());
    }
  },

  props: {
    // Used to filter tasks, expects a string. 
    statusFilter: String
  },
  
  computed: {
    // A computed property that filters the tasks based on the statusFilter prop.
    // If a statusFilter is provided, it returns only the tasks that match the filter.
    // If no statusFilter is provided, it returns all tasks.
    filteredTasks() {
      if (this.statusFilter) {
        return this.tasks.filter(task => task.status === this.statusFilter);
      }
      return this.tasks;
    }
  },

  methods: {
    submit() {
      // If there is no input return nothing.
      if (this.task.trim().length === 0) return;

      // If the user is not editing a task, create a new task, increment the counter and set the status to idle by default. 
      if (this.editedTask === null) {
        this.tasks.push({
          id: ++this.taskCount,
          name: this.task.trim(),
          status: 'Idle'
        });

        // If the user clicks on an existing task, we instead find the task they are looking to edit and change the name based on input.
      } else {
        const task = this.tasks.find(t => t.id === this.editedTask.id);
        if (task) task.name = this.task.trim();
        this.editedTask = null;
      }

      this.task = '';
    },

    // Find the task by task.id and filter it out. 
    deleteTask(toDelete) {
      this.tasks = this.tasks.filter(task => task.id !== toDelete.id);
    },

    // Edit the task by setting the input field to the task's name and setting the editedTask to the task to be edited.
    editTask(toEdit) {
      this.task = toEdit.name;
      this.editedTask = toEdit;
    },

    // Update the status of the task by finding it and cycling to the next status in the statusOptions array.
    // I would like to change this process to a dropdown instead. 
    updateStatus(toUpdate) {
    let task = this.tasks.find(t => t.id === toUpdate.id);
    if (task) {
    let newIndex = this.statusOptions.indexOf(task.status);
    newIndex = (newIndex + 1) % this.statusOptions.length;
    task.status = this.statusOptions[newIndex];
    console.log(`Updated Status of task: ${task.name} to status of: ${task.status}`);
  }
},
  }
};
</script>

<style scoped>

.tablePosition {
  margin-left: 8.75rem;
  margin-right: 8.75rem;
}

.labels {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.textField {
  margin-left: 8.75rem;
  margin-right: 8.75rem;
}

input {
  border: none;
  transition: none;
  background-color: none;
  font-weight: 500
}

input:focus {
  border-color: none;
  box-shadow: none;
}

input::placeholder {
    color: var(--text-CTA);
    font-weight: 600
}

.pointer {
  cursor: pointer;
}
</style>