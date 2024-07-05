import { createRouter, createWebHistory } from 'vue-router';
import TodoView from '../components/Todo.vue';

// Route Configs
const routes = [
  // Route for the root path ('/'), renders the TodoView component with no status filter
  { path: '/', component: TodoView, props: {statusFilter: '' } },
  // Route for '/in-progress', renders the TodoView component with a status filter of 'In progress'
  { path: '/in-progress', component: TodoView, props: { statusFilter: 'In progress' } },
  // Route for '/complete', renders the TodoView component with a status filter of 'Complete'
  { path: '/complete', component: TodoView, props: { statusFilter: 'Complete' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
