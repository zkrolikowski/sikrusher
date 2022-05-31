// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, remote } = require('electron')
const path = require('path') //used for preload

// download the edited image applying all filters.
function downloadImage() {
  console.log("download meow!")
}

// opens up the application
function createWindow() {
    // The main GUI application settings
    const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minHeight: 530,
    minWidth: 900,
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  })
  mainWindow.loadFile('app/index.html')
  //mainWindow.webContents.openDevTools()
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
  // signals to perform function calls from renderer
  ipcMain.on('s-quit-program', quitProgram)
  ipcMain.on('s-minimize-program', minimizeProgram)
  ipcMain.on('s-maximize-Program', maxmimizeProgram)
  ipcMain.handle('s-add-image', addImage)
  ipcMain.on('s-download-image', downloadImage)

  // create the window
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// closes all windows if all tabs are closed. For Windows and linux
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

//========================================
//        FUNCTIONS FOR RENDERER
//========================================

// quit the application
function quitProgram() {
  app.quit()
}

// minimize the application
function minimizeProgram() {
  var window = BrowserWindow.getFocusedWindow();
  window.minimize();
}

//  maxmimize/unmaxmize the application
function maxmimizeProgram() {
  var window = BrowserWindow.getFocusedWindow();
  if (!window.isMaximized())
    window.maximize()
  else
    window.unmaximize()
}

// allow user to change the image to edit
async function addImage() {
  // opens the file explorer searching for image formats. will return image
  const { canceled, filePaths } =  await dialog.showOpenDialog(
    BrowserWindow.getFocusedWindow(),
    {
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg"] }]
  });
  if (canceled)
    return "../resources/placeholder.png"
  else
    return filePaths[0]
}
