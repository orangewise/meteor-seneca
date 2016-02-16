var d = require('debug')('seneca/server.js');
var seneca = require('seneca')();
var io = require('socket.io')(3002); // Create server.
var oplog = require('mongo-oplog')('mongodb://localhost:3001/local', { ns: 'meteor.tasks' }).tail();


// Start listening to Oplog events and emit them to connected clients.
oplog.on('insert', function (doc) {
  d('oplog insert', doc);
  var task = doc.o;
  io.emit('created', task._id, task);
});
oplog.on('delete', function (doc) {
  d('oplog delete', doc);
  var id = doc.o._id;
  io.emit('removed', id);
});
oplog.on('update', function (doc) {
  d('oplog update', doc);
  var id = doc.o2._id;
  var fields = doc.o.$set;
  io.emit('updated', id, fields);
});


// Listen to requests, perform actions.
seneca
  .use('mongo-store', { name: 'meteor', host: 'localhost', port: 3001 })
  .use('./tasks')
  .listen();
