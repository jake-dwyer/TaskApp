import { createRouter, createWebHistory } from 'vue-router';
import TodoView from '../components/Todo.vue';

const routes = [
  { path: '/', component: TodoView, props: {statusFilter: '' } },
  { path: '/in-progress', component: TodoView, props: { statusFilter: 'In progress' } },
  { path: '/complete', component: TodoView, props: { statusFilter: 'Complete' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
