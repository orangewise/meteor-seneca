var d = require('debug')('seneca/tasks.js');

module.exports = function tasks() {
  var seneca = this;

  // Abstract the data source by using the Seneca Entity API.
  seneca.add({ role: 'tasks', cmd: 'create'}, function createTask (msg, done) {
    d('create', msg);
    seneca.make$('tasks').save$({ text: msg.task }, done);
  });

  seneca.add({ role: 'tasks', cmd: 'remove'}, function removeTask (msg, done) {
    d('remove', msg);
    seneca.make$('tasks').remove$({ id: msg.id }, done);
  });

  seneca.add({ role: 'tasks', cmd: 'list' }, function listTasks (msg, done) {
    d('list', msg);
    seneca.make$('tasks').list$(done);
  });

  seneca.add({ role: 'tasks', cmd: 'check' }, function checkTask (msg, done) {
    d('check', msg);
    seneca.make$('tasks').load$({ id: msg.id }, function (error, task) {
      if (error) {
        done(error);
      } else {
        task.data$({ checked: msg.checked }).save$(done);
      }
    });
  });

};
