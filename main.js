const { app, BrowserWindow } = require('electron');
app.on('ready', () => {
  const win = new BrowserWindow({ width: 1000, height: 600 });
  win.loadFile('index.html');
});
