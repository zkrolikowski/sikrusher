// this is renderer 

const closeWinButton = document.getElementById('close-button')
const minimizeWinButton = document.getElementById('min-button')
const maximizeWinButton = document.getElementById('max-button')
const addImageButton = document.getElementById('add-img-button')
const userImagePath = document.getElementById('user-image')
const downloadImageButton = document.getElementById('download-img-button')

// These will call the signals that were configured in preload
// Quit the program on click
closeWinButton.addEventListener('click', () => {
    window.electronAPI.quitProgram()
});

// minimize program on click
minimizeWinButton.addEventListener('click', () => {
    window.electronAPI.minimizeProgram()
});

// un/maximuize the program on click
maximizeWinButton.addEventListener('click', () => {
    window.electronAPI.maximizeProgram()
});

// allow the user to add their own image to the app
addImageButton.addEventListener('click', async () => {
    const filePath = await window.electronAPI.addImage()
    userImagePath.src = filePath //change the image
});

// download the resulting image to the users selected choice
downloadImageButton.addEventListener('click', () => {
    window.electronAPI.downloadImage()
});

