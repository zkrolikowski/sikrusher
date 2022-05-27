// this is renderer 

// const data = await ipcRenderer.invoke('read-file', '..\main.js')
// // ... do something with data ...

// const closedButton = document.getElementById('close-button')

// closedButton.addEventListener('input', function(Event){
    
// })

// function quitProgram(){
//     console.log("meow")
//     app.quit()
// }

import { ipcRenderer } from 'electron';

(async () => {
    const result = await ipcRenderer.invoke('quit', [1, 2, 3]);
    console.log(result); // prints "foo"
})();
