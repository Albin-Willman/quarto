if (Meteor.isClient) { 
  Template.body.events ({
    'click #restart': function (e){
      Meteor.call('newGame');
      $('.restart').hide();
    }
  });
}