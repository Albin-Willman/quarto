Template.newGame.events ({
  'click #new-game': function (e){
    var advanced = false;
    if($('#rule-set').val() == 'advanced'){
      advanced = true;
    }
    Meteor.call('newGame', advanced);
  }
});