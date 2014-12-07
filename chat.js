if (Meteor.isClient) {
  Template.body.helpers({
    messages: function () {
      var messages = Messages.find({}, { sort: { time: -1 } } ).fetch();
      return messages.slice(0,20).reverse();;
    }
  });
  Template.body.events ({
    'click #send': function (e){
      var message = $("#message").val();
      var name = $("#player_name").val();
      Messages.insert({text: message, author: name, time: Date.now() });
      $("#message").val('');
    }
    
  });
}