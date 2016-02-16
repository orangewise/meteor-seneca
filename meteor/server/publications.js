var d = debug('meteor-seneca/server/publications.js');
var seneca = Meteor.npmRequire('seneca')().client();
var io = Meteor.npmRequire('socket.io-client');

Meteor.publish('tasks', function () {

  var self = this;

  seneca.act({ role: 'tasks', cmd: 'list'}, function (error, tasks) {

    var socket = io('http://localhost:3002');

    // Initial set of records.
    tasks.forEach(function (task) {
      self.added('tasks', task.id, task);
    });

    // Start web-socket listeners.
    socket.on('created', function (id, fields) { 
      d('created', id);
      self.added('tasks', id, fields);
    });
    socket.on('updated', function (id, fields) { 
      d('updated', id);
      self.changed('tasks', id, fields);
    });
    socket.on('removed', function (id) { 
      d('removed', id);
      self.removed('tasks', id);
    });

    self.onStop(function () {
      d('socket.disconnect');
      socket.disconnect();
    });

    // Tell client we're done.
    self.ready();
  });
});