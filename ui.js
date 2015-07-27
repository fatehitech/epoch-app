var $ = require('jquery');
var ipc = require('ipc');

$('.container').append(
  $('<button>')
  .text('Terminate')
  .click(function() {
    ipc.send('terminate');
  })
)
