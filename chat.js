Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  Template.body.helpers({
    messages: function () {
      return Messages.find({}, { sort: { time: 1 } });
    }
  });
  Template.body.events ({
    'click #send': function (e){
      var message = $("#message").val();
      Messages.insert({text: message, time: Date.now() });
      $("#message").val('');
    }
    
  });
}