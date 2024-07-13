import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            tasks: [],
            taskCount: 0, 
            theme: 'light',
            userPreferences: {}
        };
    },
    mutations: {
        addTask(state, task) {
            state.taskCount++;
            task.id = state.taskCount; // Ensuring each task gets a unique ID
            state.tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask(state, taskId) {
            console.log("Deleting task with ID:", taskId);
            state.tasks = state.tasks.filter(task => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTaskStatus(state, { taskId, newStatus }) {
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
                task.status = newStatus;
            }
        },
        clearTasks(state) {
            state.tasks = [];
        },
        setTheme(state, theme) {
            state.theme = theme;
            document.body.style.backgroundColor = theme === 'dark' ? 'var(--dark-background)' : 'var(--light-background)';
        },
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
          },
        setUserPreferences(state, preferences) {
            state.userPreferences = preferences;
        }
    },
    actions: {
        fetchTasks({ commit, state }) {
            if (state.tasks.length === 0) {
                const tasksFromApi = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
                tasksFromApi.forEach(task => {
                    commit('addTask', task);
                });
            }
        },
        saveTasks({ state }) {
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        initializeTasks(state) {
            let tasks = localStorage.getItem('tasks');
            if (tasks) {
                state.tasks = JSON.parse(tasks);
            }
        },
        initializeTheme({ commit }) {
            const savedTheme = localStorage.getItem('theme') || 'light';
            commit('setTheme', savedTheme);
        }
    },
    getters: {
        filteredTasks: (state) => (statusFilter) => {
          console.log('Current filter:', statusFilter);
          if (!statusFilter) {
            return state.tasks;
          }
          return state.tasks.filter(task =>
            task.status.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() ===
            statusFilter.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
          );
        }
      },
         
});
