Template.body.helpers({
  messages: function () {
    return Messages.find({}, { sort: { created_at: -1 }, limit: 20 } ).fetch().reverse();
  }
});
Template.body.events ({
  'click #send': function (e){
    var message = $("#message").val();
    if(message.length){
      var name = $("#player_name").val();
      var message = new Message(null, name, message);
      message.save();
      $("#message").val('');
    }
  }
});
