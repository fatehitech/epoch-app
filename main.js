// https://github.com/maxogden/menubar
// https://github.com/atom/electron/blob/master/docs/api/browser-window.md
var app = require('app')
var Tray = require('tray')
var Menu = require('menu')
var MenuItem = require('menu-item')
var ipc = require('ipc')
var BrowserWindow = require('browser-window')

app.on('ready', function ready () {

  win = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
  });
  win.on('closed', function() {
    win = null;
  });

  win.webContents.on('did-finish-load', function() {
    win.show();
  });

  win.loadUrl('file://'+__dirname+'/index.html');

  ipc.on('clockedIn', function(name) {
    tray.setImage(__dirname+'/tray_icons/green.png');
  });

  ipc.on('clockedOut', function(name) {
    tray.setImage(__dirname+'/tray_icons/red.png');
  });

  ipc.on('terminate', function() {
    app.terminate()
  });

  ipc.on('toggleDevTools', function() {
    win.toggleDevTools({detach: true});
  })

  win.on('close', function() {
    win.hide();
  });

  app.on('window-all-closed', function() {
    //app.quit();
  });

  tray = new Tray(__dirname+'/tray_icons/red.png')

  var menu = new Menu();
  menu.append(new MenuItem({ label: 'Show', click: function() { 
    win.show()
  } }));

  tray.setContextMenu(menu);

})
