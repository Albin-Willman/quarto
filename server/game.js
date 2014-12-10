Meteor.methods({
  newGame: function(advanced) {
    setupNewGame(advanced);
  },
  currentGame: function() {
    return Games.findOne({ won: false })
  }
});

setupNewGame = function(advanced) {
  if(!Meteor.call('currentGame')){
    var game = new Game(null, advanced);
    game.save();
    for(i = 0; i < 16; i++){
      var piece = new Piece(null, i, null, game.id);
      piece.save();
    }
  }
}