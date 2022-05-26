// Modules to control application life and create native browser window
import { ipcMain } from 'electron';

const { app, BrowserWindow } = require('electron')
const path = require('path')
const { isMainThread } = require('worker_threads')

ipcMain.handle('read-file', async (event, path) => {
  if (!pathIsOK(path)) throw new Error('forbidden')
  const buf = await fs.promises.readFile(path)
  return buf
})

function createWindow() {

  // The main GUI application settings
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 300,
    minWidth: 400,
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadFile('app/index.html')
  mainWindow.webContents.openDevTools()
  mainWindow.setMenuBarVisibility(false)
 
  // The splash window settings
  var splash = new BrowserWindow({ 
    width: 800, 
    height: 800, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true,
    resizable: false
  });
  
  // Display the splash window for 5 secs
  splash.loadFile('app/splash.html');
  splash.center();
  setTimeout(function () {
    splash.close();
    mainWindow.center();
    mainWindow.show();
  }, 5000);
}

// Display Main GUI
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// closes all windows if all tabs are closed. For Windows and linux
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
