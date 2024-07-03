<template>
<div class="tablePosition">
  <table class="table">
  <thead>
    <tr>
      <th scope="col" class="labels">Task</th>
      <th scope="col" class="labels">Status</th>
      <th scope="col" class="labels text-center">#</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(task, index) in filteredTasks" :key="index">
      <th style="width: 240px">
        <span class="pointer" @click="editTask(index)">
          {{ task.name }}
        </span>
      </th>
      <td style="width: 120px">
        <span class="pointer" @click="updateStatus(index)">
          <text :class="{'complete' : task.status === 'Complete',
                         'idle' : task.status === 'Idle',
                         'inProgress' : task.status === 'In progress'}">
            {{ task.status }}
          </text>
        </span>
      </td>
      <td>
        <div class="text-center" @click="deleteTask(index)">
          <span class="fa fa-trash"></span>
        </div>
      </td>
    </tr>
  </tbody>
  </table>
</div>

<div class="textField">
  <div class="d-flex">
    <input v-model="task" type="text" placeholder="+ Create a new task" class="form-control" @keyup.enter="submit">
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      task: '',
      editedTask: null,
      selectedStatus: '',
      statusOptions: ['Idle', 'In progress', 'Complete'],
      tasks: [
        {
          name: 'Take bo for walk',
          status: 'Idle'
        },
        {
          name: 'Create todo app',
          status: 'Complete'
        },
        {
          name: 'Create Views',
          status: 'In progress'
        },
      ]
    }
  },

  props: {
    statusFilter: String
  },
  
  computed: {
    filteredTasks() {
      if (this.statusFilter) {
        return this.tasks.filter(task => task.status === this.statusFilter);
      }
      return this.tasks;
    }
  },

  methods: {
    submit() {
      if(this.task.trim().length === 0) return;

      if(this.editedTask === null) {
        this.tasks.push( {
          name: this.task.trim(),
          status: 'Idle'
        });
      } else {
        this.tasks[this.editedTask].name = this.task.trim();
        this.editedTask = null;
      }

      this.task = ''
      console.log(this.tasks);
    },

    deleteTask(index) {
      this.tasks.splice(index, 1);
      console.log(this.tasks);
    },

    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },

    updateStatus(index) {
      let newIndex = this.statusOptions.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.statusOptions[newIndex];
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
  font-family: 'Helvetica Neue';
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
}

input:focus {
  border-color: none;
  box-shadow: none;
}

input::placeholder {
    color: var(--text-CTA);
    font-family: 'Helvetica Neue';
    font-weight: 500
}

button {
  background-color: var(--text-CTA);
  border: none;
  border-radius: 4px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.pointer {
  cursor: pointer;
}
</style>