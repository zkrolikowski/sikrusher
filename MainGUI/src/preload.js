const { contextBridge, ipcRenderer } = require('electron')

// signals to send to main
contextBridge.exposeInMainWorld('electronAPI', {
  quitProgram: () => ipcRenderer.send('s-quit-program'),
  minimizeProgram: () => ipcRenderer.send('s-minimize-program'),
  maximizeProgram: () => ipcRenderer.send('s-maximize-Program'),
  addImage: () => ipcRenderer.invoke('s-add-image'),
  downloadImage: () => ipcRenderer.send('s-download-image')
})