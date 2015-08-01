// https://github.com/maxogden/menubar
// https://github.com/atom/electron/blob/master/docs/api/browser-window.md
var app = require('app')
var Tray = require('tray')
var Menu = require('menu')
var MenuItem = require('menu-item')
var ipc = require('ipc')
var BrowserWindow = require('browser-window')

app.on('ready', function ready () {

  var win = new BrowserWindow({
    width: 300,
    height: 300,
    show: false,
    frame: false,
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
    app.quit()
  });

  ipc.on('toggleDevTools', function() {
    win.toggleDevTools({detach: true});
  })

  tray = new Tray(__dirname+'/tray_icons/red.png')

  var menu = new Menu();

  menu.append(new MenuItem({
    label: 'Show',
    click: function() { 
      win.show()
    }
  }));

  menu.append(new MenuItem({
    label: 'Quit',
    click: function() { 
      app.quit()
    }
  }));

  tray.setContextMenu(menu);

})
