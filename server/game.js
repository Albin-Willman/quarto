Meteor.methods({
  newGame: function(advanced) {
    setupNewGame(advanced);
  }
});

setupNewGame = function(advanced) {
  if(currentGame() == undefined || true){
    var game = new Game(null, advanced);
    game.save();
    return true;
  }
  return false;
}