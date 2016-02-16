var d = debug('meteor-seneca/server/methods.js');
var seneca = Meteor.npmRequire('seneca')().client();
var senecaAction = Meteor.wrapAsync(seneca.act, seneca);

Meteor.methods({

  'task.add': function (task) {
    d('task.add', task);
    return senecaAction({ role: 'tasks', cmd: 'create', task });
  },

  'task.remove': function (id) {
    d('task.remove', id);
    return senecaAction({ role: 'tasks', cmd: 'remove', id });
  },

  'task.check': function (id, checked) {
    d('task.check', id);
    return senecaAction({ role: 'tasks', cmd: 'check', id, checked });
  }

});
