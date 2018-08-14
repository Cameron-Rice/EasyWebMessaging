const {app, BrowserWindow} = require('electron')

let win;

function bootApp () {

		win = new BrowserWindow({
			height: 1200,
			width: 720,
			titleBarStyle: "hiddenInset",
			Show: false
		});

		win.setMenu(null);

		win.loadURL("https://messages.android.com/");

		win.on('ready-to-show', () => {
			win.Show();
		});

		win.on('closed', () => {
			win = null;
		});
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