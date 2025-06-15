<template>
  <div class="toolbar">
    <h1 class="title">{{ viewTitle }}</h1>
    <div class="toolbar-actions">
    
     
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute,useRouter } from 'vue-router'

const route = useRoute()



const viewTitle = computed(() => {
  switch (route.path) {
    case '/bracket': return 'Brackets View'
    case '/today': return "Today's Matches"
    case '/players': return 'Players Stats'
    default: return 'Dashboard'
  }
})


</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  color: white;
}
.title {
  font-size: 1.4rem;
  font-weight: 600;
}
.toolbar-actions button {
  margin-left: 0.5rem;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #22c55e;
}
.toolbar-actions button:hover {
  color: #10b981;
}
</style>
