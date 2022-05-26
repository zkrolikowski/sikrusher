// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('app/index.html')
  // and load the index.html of the app.
  var splash = new BrowserWindow({ 
    width: 800, 
    height: 800, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });
  
  splash.loadFile('app/splash.html');
  splash.center();

  setTimeout(function () {
    splash.close();
    mainWindow.center();
    mainWindow.show();
  }, 5000);
}

app.whenReady().then(() => {
  createWindow()


  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
