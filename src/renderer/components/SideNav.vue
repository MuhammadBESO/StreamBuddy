<template>
  <div class="app">
    <aside class="side-nav">
      <router-link
        v-for="(route, index) in views"
        :key="index"
        :to="route.path"
        class="nav-link"
        active-class="active"
      >
        {{ route.name }}
      </router-link>
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
const views = [
 { name: 'Bracket Views', path: '/bracket' }, 
{ name: 'Today\'s Matches', path: '/today' },
 
]
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}

.side-nav {
  width: 200px;
  background-color: #1f2937;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.nav-link {
  color: #cbd5e1;
  padding: 0.5rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover {
  background-color: #374151;
}

.active {
  background-color: #4f46e5;
  color: white;
}

.main-content {
  flex: 1;
  padding: 1rem;
  background: #121826;
  color: white;
}
</style>
