currentGame = function(){
  return Games.findOne({ finnished: false });
}