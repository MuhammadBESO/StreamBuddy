
<template>
  <div class="container">
    <h1 class="header">Today's Matches</h1>

    <div class="panel">
      <div class="panel-title">INFO</div>
      <div class="input-row">
        <span>Date</span>
        <input type="date" v-model="matchInfo.date" class="input" />
      </div>
    </div>

   
    <div v-for="(match, index) in matchInfo.matches" :key="index" class="panel">
      <div class="panel-title">{{ index === 0 ? 'FIRST MATCH' : 'SECOND MATCH' }}</div>

      <div class="input-row">
        <span>Time</span>
        <input type="time" v-model="match.time" class="input" />
      </div>

      <div class="teams">
        <div class="team" v-for="side in ['left', 'right']" :key="side">
          <div class="input-row">
            <input
              type="text"
              v-model="match[side].name"
              class="input"
              :placeholder="`${side === 'left' ? 'Left' : 'Right'} Team Name`"
            />
          </div>

      
          <div class="input-group">
            <span>{{ side === 'left' ? 'Left' : 'Right' }} Team Logo</span>
            <div class="upload-row">
              <input type="file" class="custom-file" accept="image/*" @change="onImageChange($event, match[side], 'logo')" />
            </div>
            <div v-if="match[side].logo" class="preview">
              <img :src="match[side].logo.preview" />
              <span>{{ match[side].logo.name }}</span>
              <font-awesome-icon icon="trash" class="delete-icon" @click="match[side].logo = null" />
            </div>
          </div>

    
          <div class="input-group">
            <span>{{ side === 'left' ? 'Left' : 'Right' }} Team Flag</span>
            <div class="upload-row">
              <input type="file" class="custom-file" accept="image/*" @change="onImageChange($event, match[side], 'flag')" />
            </div>
            <div v-if="match[side].flag" class="preview">
              <img :src="match[side].flag.preview" />
              <span>{{ match[side].flag.name }}</span>
              <font-awesome-icon icon="trash" class="delete-icon" @click="match[side].flag = null" />
            </div>
          </div>
        </div>
      </div>
    </div>


    <button class="export-button" @click="exportData">Export Today's Matches</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const STORAGE_KEY ="Today's Matches"

const defaultData = {
  date: '',
  matches: [
    {
      time: '',
      left: { name: '', logo: "", flag: "" },
      right: { name: '', logo: "", flag: "" }
    },
    {
      time: '',
      left: { name: '', logo: "", flag: "" },
      right: { name: '', logo: "", flag: "" }
    }
  ]
}

const matchInfo = reactive(loadFromStorage())

function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : structuredClone(defaultData)
}

watch(
  () => matchInfo,
  () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matchInfo))
  },
  { deep: true }
)

function onImageChange(event, team, key) {
  const file = event.target.files[0]
  if (!file) return

  const fileNameWithoutExt = file.name

  const reader = new FileReader()
  reader.onload = (e) => {
    team[key] = {
      name: fileNameWithoutExt,
      preview: e.target.result
    }
  }
  reader.readAsDataURL(file)
}

function exportData() {
  const cleanData = JSON.parse(JSON.stringify(matchInfo))


  cleanData.matches.forEach((match) => {
    ['left', 'right'].forEach((side) => {
      ['logo', 'flag'].forEach((key) => {
        if (match[side][key] && match[side][key].name) {
          match[side][key] = match[side][key].name
        } else {
          match[side][key] = ""
        }
      })
    })
  })

  const dataStr = JSON.stringify(cleanData, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = "Today's Matches.json"
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.container {
  padding: 20px;
  background: #0f172a;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.panel {
  background: #1e293b;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.panel-title {
  font-size: 13px;
  font-weight: bold;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 14px;
  border-bottom: 1px solid #334155;
  padding-bottom: 6px;
}

span {
  font-size: 13px;
  font-weight: bold;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 14px;
  border-bottom: 1px solid #334155;
}

.input-row {
  position: relative;
  margin-bottom: 16px;
}

.input {
  width: 100%;
  background: #334155;
  border: none;
  border-radius: 6px;
  padding: 10px 0px;
  padding-left: 5px;
  font-size: 14px;
  color: #fff;
}

.input::placeholder {
  padding-left: 5px;
}

.teams {
  display: flex;
  gap: 32px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.team {
  flex: 1;
  min-width: 300px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group span {
  display: block;
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 6px;
}

.upload-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #334155;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.custom-file {
  all: unset;
  cursor: pointer;
}

.custom-file::file-selector-button {
  color: #22c55e;
  background: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.preview {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  position: relative;
}

.preview img {
  height: 50px;
  border: 1px solid #475569;
  border-radius: 6px;
}

.delete-icon {
  color: #ef4444;
  cursor: pointer;
  font-size: 16px;
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

