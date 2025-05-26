<template>
  <div class="bracket-container">
    <h1 class="title">Bracket Views</h1>

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
            :ref="(el) => setInputRef(index, 'image', el)"
          />
          <button
            v-if="team.image"
            class="delete-button"
            @click="deleteImage(team, 'image', index)"
            title="Remove Image"
          >
            <font-awesome-icon icon="trash" />
          </button>
        </div>
        <div v-if="team.image" class="preview-wrapper">
          <img :src="team.image" alt="Team Image" class="preview" />
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
            :ref="(el) => setInputRef(index, 'flag', el)"
          />
          <button
            v-if="team.flag"
            class="delete-button"
            @click="deleteImage(team, 'flag', index)"
            title="Remove Flag"
          >
            <font-awesome-icon icon="trash" />
          </button>
        </div>
        <div v-if="team.flag" class="preview-wrapper">
          <img :src="team.flag" alt="Team Flag" class="preview" />
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
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const teams = reactive(
  Array.from({ length: 32 }, () => ({
    image: null,
    flag: null,
    name: '',
    score: 0,
  })),
)

const fileInputs = ref([])

function setInputRef(index, key, el) {
  if (!fileInputs.value[index]) fileInputs.value[index] = {}
  fileInputs.value[index][key] = el
}

function onImageChange(event, team, key) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      team[key] = reader.result
    }
    reader.readAsDataURL(file)
  }
}

function deleteImage(team, key, index) {
  team[key] = null
  const inputRef = fileInputs.value[index]?.[key]
  if (inputRef) inputRef.value = ''
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

@media (max-width: 768px) {
  .team-card {
    grid-template-columns: 1fr;
  }
}
</style>
