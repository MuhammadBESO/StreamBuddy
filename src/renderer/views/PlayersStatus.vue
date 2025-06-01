<template>
  <div class="bracket-container">
    <h1 class="title">Players Stats</h1>

    <div v-for="(field, index) in fields" :key="index" class="team-card">
      <!-- Text/Number Input -->
      <div class="field" v-if="field.type !== 'file'">
        <label :for="field.name">{{ field.label }}</label>
        <input
          :type="field.type"
          :id="field.name"
          v-model="form[field.name]"
          :placeholder="field.label"
        />
      </div>

      <!-- Image File Input -->
      <div class="field file-wrapper" v-else>
        <label :for="field.name">{{ field.label }}</label>
        <div class="input-preview-wrapper">
          <input
            class="custom-file"
            type="file"
            :id="field.name"
            accept="image/*"
            @change="handleFileUpload($event, field.name)"
            :ref="(el) => setInputRef(field.name, el)"
          />
          <button
            v-if="form[field.name]"
            class="delete-button"
            @click="deleteImage(field.name)"
            title="Remove Image"
          >
            🗑
          </button>
        </div>
        <div v-if="form[field.name]" class="preview-wrapper">
          <img :src="form[field.name].preview" alt="Preview" class="preview" />
          <span>{{ form[field.name].name }}</span>
        </div>
      </div>
    </div>

    <button class="export-button" @click="exportData">Export Player Status</button>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'

// Reactive form data
const form = ref({
  playerName: '',
  teamName: '',
  favoriteWeapon: '',
  economyScore: null,
  heroImage: null,
  kills: null,
  deaths: null,
  assists: null,
})

// File input refs
const fileInputs = ref({})
function setInputRef(name, el) {
  fileInputs.value[name] = el
}

// Fields config
const fields = [
  { label: 'Player Name', name: 'playerName', type: 'text' },
  { label: 'Team Name', name: 'teamName', type: 'text' },
  { label: 'Favorite Weapon', name: 'favoriteWeapon', type: 'text' },
  { label: 'Economy Score', name: 'economyScore', type: 'number' },
  { label: 'Hero Image', name: 'heroImage', type: 'file' },
  { label: 'Kills', name: 'kills', type: 'number' },
  { label: 'Deaths', name: 'deaths', type: 'number' },
  { label: 'Assists', name: 'assists', type: 'number' },
]

// Load from localStorage
const stored = localStorage.getItem('player-status')
if (stored) {
  const parsed = JSON.parse(stored)
  if (parsed.heroImage && typeof parsed.heroImage === 'string') {
    parsed.heroImage = { name: parsed.heroImage, preview: '' } // preview is reloaded on user action
  }
  Object.assign(form.value, parsed)
}

// Handle file upload
function handleFileUpload(event, fieldName) {
  const file = event.target.files[0]
  if (!file) return

  const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')

  const reader = new FileReader()
  reader.onload = (e) => {
    form.value[fieldName] = {
      name: nameWithoutExt,
      preview: e.target.result,
    }
  }
  reader.readAsDataURL(file)
}

// Delete image
function deleteImage(fieldName) {
  form.value[fieldName] = null
  const input = fileInputs.value[fieldName]
  if (input) input.value = ''
}

// Watch and save (only image name)
watch(
  form,
  () => {
    const cleanData = { ...form.value }
    if (cleanData.heroImage && typeof cleanData.heroImage === 'object') {
      cleanData.heroImage = cleanData.heroImage.name
    }
    localStorage.setItem('player-status', JSON.stringify(cleanData))
  },
  { deep: true }
)

// Export clean data
function exportData() {
  const cleanExport = { ...form.value }
  if (cleanExport.heroImage && typeof cleanExport.heroImage === 'object') {
    cleanExport.heroImage = cleanExport.heroImage.name
  }

  const blob = new Blob([JSON.stringify(cleanExport, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'player-status.json'
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.team-card:hover {
  transform: scale(1.01);
  background: #273549;
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
  width: 100%;
  box-sizing: border-box;
}

input[type='text']:focus,
input[type='number']:focus {
  outline: 2px solid #4f46e5;
}

.preview {
  margin-top: 0.5rem;
  max-height: 60px;
  object-fit: contain;
  border: 1px solid #444;
  border-radius: 6px;
}

.preview-wrapper {
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
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
  padding: 0;
  line-height: 1;
}

.file-wrapper {
  position: relative;
}

.custom-file::file-selector-button {
  color: #22c55e;
  background: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
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
</style>
