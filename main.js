// https://github.com/maxogden/menubar
// https://github.com/atom/electron/blob/master/docs/api/browser-window.md
var menubar = require('menubar')
var ipc = require('ipc');

var mb = menubar({
  dir: __dirname
})

mb.on('ready', function ready () {
  console.log('app is ready')

  ipc.on('terminate', function() {
    mb.app.terminate()
  });
})
