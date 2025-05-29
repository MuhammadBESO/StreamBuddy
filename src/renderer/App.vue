<template>
  <div class="app-container">
    <aside class="side-nav">
      <h2 class="nav-title">Views</h2>
      <RouterLink to="/bracket" class="nav-link" active-class="active-link">Bracket Views</RouterLink>
      <RouterLink to="/today" class="nav-link" active-class="active-link">Today's Matches</RouterLink>
      <RouterLink to="/players" class="nav-link" active-class="active-link">Players Status</RouterLink>
    </aside>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #121826;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.side-nav {
  width: 220px;
  background-color: #1f2937;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
}

.nav-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #22c55e;
}

.nav-link {
  text-decoration: none;
  color: #cbd5e1;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background 0.2s ease;
}

.nav-link:hover {
  background-color: #273549;
}

.active-link {
  background-color: #4f46e5;
  color: #fff;
}

.main-content {
  flex: 1;
  padding: 2rem;
  color: #fff;
}
</style>
