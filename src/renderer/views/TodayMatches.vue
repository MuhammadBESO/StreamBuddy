<template>
  <div class="container">
    <h1 class="header">Today's Matches</h1>

    <!-- Date Section -->
    <div class="panel">
      <div class="panel-title">INFO</div>
      <div class="input-row">
   
        <input type="date" v-model="matchInfo.date" class="input" />
      </div>
    </div>

    <!-- Matches Section -->
    <div v-for="(match, index) in matchInfo.matches" :key="index" class="panel">
      <div class="panel-title">{{ index === 0 ? 'FIRST MATCH' : 'SECOND MATCH' }}</div>

      <!-- Match Time -->
      <div class="input-row">
        
        <input type="time" v-model="match.time"  class="input" />
      </div>

      <!-- Teams -->
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
              <input type="file"  class="custom-file" accept="image/*" @change="onImageChange($event, match[side], 'logo')" />
          
            </div>
            <div v-if="match[side].logo" class="preview">
              <img :src="match[side].logo" />
              <font-awesome-icon icon="trash" class="delete-icon" @click="match[side].logo = null" />
            </div>
          </div>

          <div class="input-group">
            <span>{{ side === 'left' ? 'Left' : 'Right' }} Team Flag</span>
            <div class="upload-row">
              <input type="file"  class="custom-file" accept="image/*" @change="onImageChange($event, match[side], 'flag')" />
           
            </div>
            <div v-if="match[side].flag" class="preview">
              <img :src="match[side].flag" />
              <font-awesome-icon icon="trash" class="delete-icon" @click="match[side].flag = null" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const matchInfo = reactive({
  date: '',
  matches: [
    {
      time: '',
      left: { name: '', logo: null, flag: null },
      right: { name: '', logo: null, flag: null },
    },
    {
      time: '',
      left: { name: '', logo: null, flag: null },
      right: { name: '', logo: null, flag: null },
    },
  ],
})

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

.input-row {
  position: relative;
  margin-bottom: 16px;
}

.icon-input .input {
  padding-left: 36px;
}

.icon-inside {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
  font-size: 14px;
}

.input {
  width: 100%;
   background: #334155;
 border: none;
  border-radius: 6px;
  padding: 10px 0px;
  font-size: 14px;
  color: #fff;
}
/* .input {
  width: 100%;
  background: #334155;
  border: none;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  color: #fff;
} */

.input::placeholder {
  color: #94a3b8;
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
</style>

