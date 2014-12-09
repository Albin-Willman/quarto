Template.body.events ({
  'click #restart': function (e){
    Meteor.call('newGame');
  }
});

Template.body.helpers({
  currentGame: function(){
    return Game.findOne({ won: true });
  }
});