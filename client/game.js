Template.body.helpers({
  runnningGames: function(){
    return Games.find({finnished: false});
  },
  lastGames: function(){
    return Games.find({}, {sort: {created_at : -1}, limit: 1 });
  }
});

Template.game.helpers({
  pieces: function () {
    return Pieces.find({ position: null, game_id: this.id });
  },
  slots: function () {
    var slots = [];
    for (i = 0; i < 16; i++){
      slots.push({position: i, piece: Pieces.findOne({position: i, game_id: this.id})});
    }
    return slots;
  }
});