/**
 * Keepy
 * Electron Example - Google Keep
 * @author Rafael Jaques <rafael@phpit.com.br>
 */

// Icons made by Freepik www.flaticon.com is licensed by CC 3.0 BY

const {electron, app, Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');
const icon = path.join(__dirname, 'keep.png');

const appName = "Keepy";
const winSize = {
  width: 400,
  height: 450,
}
let mainWindow, appIcon;

// Hides app icon in dock (OSX)
if (app.dock) app.dock.hide();

app.on('ready', () => {	
  
  mainWindow = new BrowserWindow({
    title: appName,
    width: winSize.width,
    height: winSize.height,
    center: true,
    frame: false,
    icon: icon,
    show: false,
    skipTaskbar: true, // Hides app icon in tasbkar (Win)
  });
  
  mainWindow.loadURL('http://keep.google.com');

  appIcon = new Tray(icon);
  appIcon.setToolTip(appName);

  appIcon.on('click', (e, bounds) => {
    if (!mainWindow.isFocused()) {
      let x = bounds.x - (winSize.width / 2) + (bounds.width / 2);
      let y = bounds.y;
      mainWindow.setPosition(x, y);
      mainWindow.show();
    } else {
      mainWindow.hide();
    }
  });
});