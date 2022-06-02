const { contextBridge, ipcRenderer } = require('electron')

// signals to send to main
contextBridge.exposeInMainWorld('electronAPI', {
  quitProgram: () => ipcRenderer.send('s-quit-program'),
  minimizeProgram: () => ipcRenderer.send('s-minimize-program'),
  maximizeProgram: () => ipcRenderer.send('s-maximize-Program'),
  addImage: (oldPath) => ipcRenderer.invoke('s-add-image', oldPath),
  downloadImage: () => ipcRenderer.send('s-download-image'),
  getWindowSize: () => ipcRenderer.invoke('r-get-window-size'),
})