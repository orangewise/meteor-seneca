

Template.body.onCreated(function () {
  this.subscribe('tasks');
});

Template.body.helpers({
  tasks: function () {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  }
});

Template.body.events({
  'submit .new-task': function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.call('task.add', text);

    // Clear form
    event.target.text.value = '';
  }
});


Template.task.events({
  'click .toggle-checked': function () {
    // Set the checked property to the opposite of its current value
    Meteor.call('task.check', this._id, ! this.checked, function (error) {
      if (error) {
        alert(error.message);
      }
    });
  },
  'click .delete': function () {
    Meteor.call('task.remove', this._id, function (error) {
      if (error) {
        alert(error.message);
      }
    });
  }
});
