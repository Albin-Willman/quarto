Template.body.helpers({
  pieces: function () {
    return Pieces.find({ position: null })
  },
  slots: function () {
    var slots = [];
    for (i = 0; i < 16; i++){
      slots.push({position: i});
    }
    return slots;
  }
});
Template.next.helpers({
  next: function() {
    return Pieces.findOne({ position: 'next' })
  }
});

Template.slot.events ({
  'click a.free-slot': function (e){
    e.preventDefault();
    var position =this.position;
    Meteor.call('setPiece', position, getPlayerName(), function(error, data){
      if(data.status){
        $('.piece').removeClass('dissabled');
        $('.free-slot').addClass('dissabled');
        if(data.win){
          $('.restart').show();
          alert('you won!');  
        }
      }
    });
  }
});
Template.piece.events ({
  'click a.piece': function(e){
    e.preventDefault();
    Meteor.call('selectNext', this._id, getPlayerName(), function(error, selected){
      if(selected){
        $('.piece').addClass('dissabled');
        $('.free-slot').removeClass('dissabled');
      }
    });
  }
});

function getPlayerName(){
  return $("#player_name").val();
}