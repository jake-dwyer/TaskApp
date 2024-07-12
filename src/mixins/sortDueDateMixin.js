export default {
    methods: {
      sortTasksByDueDate(tasks, ascending) {
        // Sorts the tasks array based on the ascending flag
        return tasks.sort((a, b) => {
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return ascending ? dateA - dateB : dateB - dateA;
        });
      }
    }
  }
  