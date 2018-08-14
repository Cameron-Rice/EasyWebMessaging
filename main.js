const {app, Tray, Menu, BrowserWindow} = require('electron')
const path = require('path')

const iconPath = path.join(__dirname, "assets/icons/icon-64.png")

let tray = null;
let win = null;

let closeToTray = false;

function bootApp () {

		win = new BrowserWindow({
			height: 1200,
			width: 720,
			minHeight: 400,
			minWidth: 400, 
			titleBarStyle: "hidden",
			Show: false,
			title: 'Easy Web Messaging',
			icon: iconPath
		});

		win.setMenu(null);

		win.loadURL("https://messages.android.com/");

		registerWindowEventListeners();

		tray = new Tray(iconPath);

		tray.setToolTip("Easy Web Messaging!")

		var contextMenu = Menu.buildFromTemplate([
		{
			label: 'Close',
			click() {app.quit()}
		}
		]);

		tray.setContextMenu(contextMenu);

		registerTrayEventListeners();
}

app.on('ready', bootApp);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
      app.quit()
    }
});

app.on('activate', () => {
	if (win === null) {
	  createWindow()
	}
});

function registerWindowEventListeners(){
	win.on('ready-to-show', () => {
		win.Show();
	});

	win.on('closed', () => {
		win = null;
	});

	win.on('page-title-updated', (e) =>{
		e.preventDefault();
	});

	win.on('minimize', (e) => {
		e.preventDefault();
		closeToTray = true;
		win.hide();
	});

}

function registerTrayEventListeners(){
	tray.on('double-click', () => {
		if(closeToTray = true){
			win.show();
			closeToTray = false;
		}
	});
}