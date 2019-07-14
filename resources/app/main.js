const { app, BrowserWindow, MenuItem, Menu, ipcMain, systemPreferences, dialog } = require('deskgap');
const { readdirSync } = require('fs');
const pr = require('./pr');

ipcMain.on('hello-to-node', (e, message) => {
	let dir = readdirSync('.');
	let list = [];
	dir.forEach(x => {
		list.push(x);
	});
	e.sender.send('hello-from-node', `${list.join(',')}`);
});
ipcMain.on('tf',(evt, arg) => {
    console.log("wait")
    let tmp =async ()=>{
        await pr.load("./my-model/model.json")
        let n = await pr.predict(arg)
        evt.sender.send("fromtf",n)
    }
    tmp()
});
let mainWindow;

app.once('ready', () => {
	mainWindow = new BrowserWindow({
		show: false,
		width: 800,
		height: 600,
	}).once('ready-to-show', async () => {
        
        mainWindow.show();
	});

	if (process.platform !== 'win32') {
		mainWindow.webView.setDevToolsEnabled(true);
	}

	for (const eventName of ['blur', 'focus']) {
		mainWindow.on(eventName, () => {
			mainWindow.webView.send('window-' + eventName);
		});
	}

	mainWindow.loadFile('app.html');

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});
