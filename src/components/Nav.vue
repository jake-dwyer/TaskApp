<template>
<!-- View Options -->
    <nav class="navbar">
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">All tasks</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/in-progress" class="nav-link">In progress</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/complete" class="nav-link">Complete</router-link>
        </li>
      </ul>
    </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  margin-left: 6.5rem;
}

.nav {
  list-style-type: none;
  display: flex;
  --bs-nav-link-color: var(--text-primary);
  --bs-nav-link-hover-color: var(--text-primary);
}

.nav-item {
  margin: 0 1rem;
}

.nav-link {
  font-family: 'Helvetica Neue';
  text-decoration: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}
</style>
