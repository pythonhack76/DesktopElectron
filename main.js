const path = require('path');
const {app, BrowserWindow, Menu } = require('electron');

const isDev = process.env.NODE_NEV !=='production';

const isMac = process.platform === 'darwin';


//creazione nuova finestra
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Image Resize',
        width: isDev ? 1000: 500,
        height: 600
    }); 

    //apri devtools if in dev

    if (isDev){
        mainWindow.webContents.openDevTools(); 
    }


    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));

}
//app pronta
app.whenReady().then(() => {
    createMainWindow();

//implementazione menu
const mainMenu = Menu.buildFromTemplate(); 

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0 ) {
                createMainWindow();
        }
    });
}); 


// Menu template

const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit(),
                accelerator: 'Ctrl+W',

            }
           
           
           
        ]
    }
]

app.on('window-all-closed', () => {
    if(!isMac) {
        app.quit() 
    }
})