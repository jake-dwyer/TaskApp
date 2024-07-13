<template>
<!-- View Options -->
    <nav class="navbar">
      <ul class="nav">
        <li class="nav-item">
          <!-- Router link has an active class property. -->
          <router-link to="/" class="nav-link" active-class="active-link">All tasks</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/in-progress" class="nav-link" active-class="active-link">In progress</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/complete" class="nav-link" active-class="active-link">Complete</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/settings" class="nav-link" active-class="active-link">Settings</router-link>
        </li>
      </ul>
    </nav>
</template>

<style scoped>
@import '../assets/base.css';
li {
  display: inline;
}

.navbar {
  display: flex;
  margin-left: 6.5rem;
  }

.nav {
  list-style-type: none;
  display: flex;
  --bs-nav-link-color: var(--color-text-primary);
  --bs-nav-link-hover-color: var(--color-text-primary);
}

.nav-item {
  margin: 0 1rem;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 16px;
  }

.active-link {
  color: var(--color-text-primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  .navbar {
    margin-left: 0;
    justify-content: center;
  }

  .nav {
    flex-direction: flex;
    align-items: center; 
  }

  .nav-item {
    margin: 0.5rem 0; 
  }

  .nav-link {
    font-size: 14px;
    padding: 1rem; 
  }
}
</style>
