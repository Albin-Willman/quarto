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
    return this.unusedPieces;
  },
  slots: function () {
    var slots = [];
    for (i = 0; i < 16; i++){
      slots.push({position: i, piece: this.pieceByPos(i)});
    }
    return slots;
  }
});