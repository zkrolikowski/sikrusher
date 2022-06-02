// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, remote } = require('electron')
const path = require('path') //used for preload

//========================================
//        GUI DISPLAY FUNCTIONS
//========================================
// opens up the application
function createWindow() {
  // The main GUI application settings
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minHeight: 430,
    minWidth: 900,
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  })
  mainWindow.loadFile('src/html/index.html')
  mainWindow.setMenuBarVisibility(false) //hide the menu bar
  mainWindow.webContents.openDevTools()

  // The splash window settings
  var splash = new BrowserWindow({
    width: 800,
    height: 800,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false
  });

  // Display the splash window for 1 second, or until main window loads
  splash.loadFile('src/html/splash.html');
  splash.center();
  mainWindow.once('ready-to-show', () => {
    setTimeout(function () {
      splash.close();
      mainWindow.center();
      mainWindow.show();
    }, 1000);
  });
} // end of createWindow()

// Display Main GUI
app.whenReady().then(() => {
  // signals to perform function calls from renderer
  ipcMain.on('s-quit-program', quitProgram)
  ipcMain.on('s-minimize-program', minimizeProgram)
  ipcMain.on('s-maximize-Program', maxmimizeProgram)
  ipcMain.handle('s-add-image', addImage)
  ipcMain.on('s-download-image', downloadImage)
  ipcMain.handle('r-get-window-size', getWindowSize)

  // create the window
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}) // end of displaying main GUI

// closes all windows if all tabs are closed. For Windows and linux
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
}) // end of closing all windows

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

// Allow the user to change the displayed image
//@params: event, the event that triggered the function
//@params: oldpath, the current source/path of the image
//@return: oldpath, the current source/path of the image
//@return: filePaths[0], the new source/path of the image user selected
async function addImage(event, oldPath) {
  // opens the file explorer searching for image formats. will return image
  const { canceled, filePaths } = await dialog.showOpenDialog(
    BrowserWindow.getFocusedWindow(),
    {
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg"] }]
    });
  if (canceled)
    return oldPath;
  else
    return filePaths[0]
}

// download the edited image applying all filters.
function downloadImage() {
  console.log("download meow!")
}

function getWindowSize(){
  if(BrowserWindow.getFocusedWindow() == null)
    return [1400, 900]
  return BrowserWindow.getFocusedWindow().getSize();
}
