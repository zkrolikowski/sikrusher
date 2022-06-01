// this is renderer 

const closeWinButton = document.getElementById('close-button')
const minimizeWinButton = document.getElementById('min-button')
const maximizeWinButton = document.getElementById('max-button')
const addImageButton1 = document.getElementById('add-img-button-1')
const addImageButton2 = document.getElementById('add-img-button-2')
const userImagePath = document.getElementById('user-image')
const downloadImageButton = document.getElementById('download-img-button')
var coll = document.getElementsByClassName("collapsible");
var i;

//========================================
//        PRELOAD SIGNAL FUNCTIONS
//========================================
// Quit the program
closeWinButton.addEventListener('click', () => {
    window.electronAPI.quitProgram()
});

// Minimize program
minimizeWinButton.addEventListener('click', () => {
    window.electronAPI.minimizeProgram()
});

// Un/maximuize the program
maximizeWinButton.addEventListener('click', () => {
    window.electronAPI.maximizeProgram()
});

// Change the image by double clicking the current image
addImageButton1.addEventListener('dblclick', async () => {
    const filePath = await window.electronAPI.addImage(userImagePath.src)
    userImagePath.src = filePath //change the image
});

// Change the image by clicking the add image button
addImageButton2.addEventListener('click', async () => {
    const filePath = await window.electronAPI.addImage(userImagePath.src)
    userImagePath.src = filePath //change the image
});

// Download the current rendered image
downloadImageButton.addEventListener('click', () => {
    window.electronAPI.downloadImage()
});

//========================================
//             JS FUNCTIONS
//========================================
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }