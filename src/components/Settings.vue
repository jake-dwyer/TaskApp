<template>
  <div class="theme-container">
    <p>Toggle Theme</p>
    <div class="theme-switcher">
      <Sun :class="{ active: !isDark }" />
      <label class="switch">
        <input type="checkbox" v-model="isDark" @change="toggleTheme">
        <span class="slider round"></span>
      </label>
      <Moon :class="{ active: isDark }" />
    </div>
  </div>
</template>

<script setup>
import Sun from './icons/Sun.vue';
import Moon from './icons/Moon.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const currentTheme = computed(() => store.state.theme);
const isDark = computed({
  get: () => currentTheme.value === 'dark',
  set: (value) => {
    store.commit('toggleTheme', value ? 'dark' : 'light');
    updateBackgroundColor();
  }
});

function toggleTheme() {
  updateBackgroundColor();
}

function updateBackgroundColor() {
  document.body.style.backgroundColor = isDark.value ? 
    getComputedStyle(document.documentElement).getPropertyValue('--dark-background') : 
    getComputedStyle(document.documentElement).getPropertyValue('--light-background');
}
</script>

<style scoped>
@import '../assets/base.css';

.theme-container {
  margin-left: 8.75rem;
  margin-top: .75rem;
}

p {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin-bottom: 1rem;
}

.theme-switcher {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 32px;
  margin: 0 12px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-grid-lines);
  transition: .4s;
  border-radius: 36px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

input:checked + .slider {
  background-color: var(--color-grid-lines);
}

.slider.round {
  border-radius: 36px;
}

.slider.round:before {
  border-radius: 50%;
}

@media (max-width: 768px) {
  .theme-container {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .switch {
    margin: 8 auto;
  }
}
</style>