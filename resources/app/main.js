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
ipcMain.on('tf', (evt, arg) => {
    let polyr = new pr([0, 1], [[0, 0], [1, 0], [0, 1], [1, 1]], [[0], [1], [1], [0]]);
    polyr.train
});
let mainWindow;

app.once('ready', () => {
	mainWindow = new BrowserWindow({
		show: false,
		width: 800,
		height: 600,
	}).once('ready-to-show', () => {
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
