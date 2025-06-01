<template>
  <div class="bracket-container">
    <h1 class="title">Brackets View</h1>

    <div class="team-card" v-for="(team, index) in teams" :key="index">
      <!-- Team Image Upload -->
      <div class="field file-wrapper">
        <label>Team Image</label>
        <div class="input-preview-wrapper">
          <input
            class="custom-file"
            type="file"
            accept="image/*"
            @change="onImageChange($event, team, 'image')"
          />
          <button v-if="team.image" class="delete-button" @click="team.image = null">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
        <div v-if="team.image" class="preview-wrapper">
          <img :src="team.image.preview" alt="Team Image" class="preview" />
          <span>{{ team.image.name }}</span>
        </div>
      </div>

      <!-- Team Flag Upload -->
      <div class="field file-wrapper">
        <label>Team Flag</label>
        <div class="input-preview-wrapper">
          <input
            class="custom-file"
            type="file"
            accept="image/*"
            @change="onImageChange($event, team, 'flag')"
          />
          <button v-if="team.flag" class="delete-button" @click="team.flag = null">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
        <div v-if="team.flag" class="preview-wrapper">
          <img :src="team.flag.preview" alt="Team Flag" class="preview" />
          <span>{{ team.flag.name }}</span>
        </div>
      </div>

      <!-- Team Name -->
      <div class="field">
        <label>Team Name</label>
        <input type="text" v-model="team.name" placeholder="Enter team name" />
      </div>

      <!-- Team Score -->
      <div class="field">
        <label>Team Score</label>
        <input type="number" v-model.number="team.score" min="0" placeholder="0" />
      </div>
    </div>

    <button class="export-button" @click="exportData">Export Bracket Views</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

// Default teams (32)
const defaultTeams = () =>
  Array.from({ length: 32 }, () => ({
    image: null,
    flag: null,
    name: '',
    score: 0,
  }))

const stored = localStorage.getItem('bracket-views')
const teams = reactive(stored ? JSON.parse(stored) : defaultTeams())

// File upload handler
function onImageChange(event, team, key) {
  const file = event.target.files[0]
  if (!file) return

  const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')

  const reader = new FileReader()
  reader.onload = (e) => {
    team[key] = {
      name: nameWithoutExt,
      preview: e.target.result,
    }
  }
  reader.readAsDataURL(file)
}

// Auto-save to localStorage
watch(
  teams,
  () => {
    localStorage.setItem('bracket-views', JSON.stringify(teams))
  },
  { deep: true }
)

// Export JSON (only names, no previews)
function exportData() {
  const exportTeams = teams.map((team) => {
    const clean = { ...team }
    if (clean.image && clean.image.name) clean.image = clean.image.name
    else clean.image = null

    if (clean.flag && clean.flag.name) clean.flag = clean.flag.name
    else clean.flag = null

    return clean
  })

  const blob = new Blob([JSON.stringify(exportTeams, null, 2)], {
    type: 'application/json',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'bracket-views.json'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.bracket-container {
  padding: 2rem;
  background: #121826;
  color: #fff;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.team-card {
  background: #1f2937;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: #cbd5e1;
}

input[type='text'],
input[type='number'],
input[type='file'] {
  padding: 0.5rem;
  border: 1px solid #3b4252;
  background: #2e3440;
  color: #e5e9f0;
  border-radius: 6px;
  font-size: 0.95rem;
}

.preview-wrapper {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview {
  max-height: 60px;
  border: 1px solid #444;
  border-radius: 6px;
}

.input-preview-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.delete-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #ef4444;
}

.export-button {
  margin-top: 20px;
  background: #22c55e;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  color: #0f172a;
  cursor: pointer;
  transition: background 0.3s;
}

.export-button:hover {
  background: #16a34a;
}

.custom-file::file-selector-button {
  color: #22c55e;
  background: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 768px) {
  .team-card {
    grid-template-columns: 1fr;
  }
}
</style>
