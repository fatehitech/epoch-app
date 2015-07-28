// https://github.com/maxogden/menubar
// https://github.com/atom/electron/blob/master/docs/api/browser-window.md
var menubar = require('menubar')
var ipc = require('ipc');

var mb = menubar({
  dir: __dirname,
  preloadWindow: true
})

mb.on('ready', function ready () {
  mb.tray.setImage('tray_icons/red.png');

  ipc.on('clockedIn', function(name) {
    mb.tray.setImage('tray_icons/green.png');
  });

  ipc.on('clockedOut', function(name) {
    mb.tray.setImage('tray_icons/red.png');
  });

  ipc.on('terminate', function() {
    mb.app.terminate()
  });

  ipc.on('toggleDevTools', function() {
    mb.window.toggleDevTools();
  })
})
