// this is renderer 

const closeWinButton = document.getElementById('close-button')
const minimizeWinButton = document.getElementById('min-button')
const maximizeWinButton = document.getElementById('max-button')
const addImageButton1 = document.getElementById('add-img-button-1')
const addImageButton2 = document.getElementById('add-img-button-2')
const userImage = document.getElementById('user-image')
const downloadImageButton = document.getElementById('download-img-button')
var coll = document.getElementsByClassName("collapsible");
var i;

window.onresize = fitImage

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
    const filePath = await window.electronAPI.addImage(userImage.src)
    userImage.src = filePath //change the image
});

// Change the image by clicking the add image button
addImageButton2.addEventListener('click', async () => {
    const filePath = await window.electronAPI.addImage(userImage.src)
    userImage.src = filePath //change the image
});

// Download the current rendered image
downloadImageButton.addEventListener('click', () => {
    window.electronAPI.downloadImage()
});

// userImage.addEventListener('load',  () => {
//   console.log("mmoew22")
// })
//l

userImage.addEventListener('load', fitImage)


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

async function fitImage()
{
  const titleBarHeight = 30
  const iconHeight = 100
  const paddenWidth = 30 + 30 // Left + right side padden
  const rightSideWidth = 630

  const windowSize = await window.electronAPI.getWindowSize()

  const validImageSpace = [windowSize[0] - (paddenWidth + rightSideWidth), 
                           windowSize[1] - (titleBarHeight + iconHeight)] 

  userImage.style.height = userImage.naturalHeight;
  userImage.style.height = userImage.naturalWidth;

  const scalerHeight = validImageSpace[1] / userImage.naturalHeight
  const scalerWidth = validImageSpace[0] / userImage.naturalWidth

  if(scalerHeight < scalerWidth)
  {
    userImage.style.height = await (userImage.naturalHeight * scalerHeight).toString() + 'px'
    userImage.style.width = await(userImage.naturalWidth * scalerHeight).toString() + 'px'
  }
  else
  {
    userImage.style.height = await (userImage.naturalHeight * scalerWidth).toString() + 'px'
    userImage.style.width = await (userImage.naturalWidth * scalerWidth).toString() + 'px'
  }

}