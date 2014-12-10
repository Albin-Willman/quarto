Meteor.methods({
  newGame: function() {
    setupNewGame();
  },
  currentGame: function() {
    
  }
});

setupNewGame = function() {
  Pieces.remove({});
  for(i = 0; i < 16; i++){
    var piece = new Piece(null, i, null);
    piece.save();
  }
}