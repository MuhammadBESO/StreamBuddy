import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  saveBrackets: (data) => ipcRenderer.invoke('save-brackets', data)
})
