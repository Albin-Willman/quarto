Meteor.methods({
  newGame: function(advanced) {
    setupNewGame(advanced);
  }
});

setupNewGame = function(advanced) {
  if(currentGame() == undefined){
    var game = new Game(null, advanced);
    game.save();
    game = currentGame();
    for(i = 0; i < 16; i++){
      var piece = new Piece(null, i, null, game.id);
      piece.save();
    }
  }
}