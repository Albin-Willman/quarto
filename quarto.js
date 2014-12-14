if (Meteor.isServer) {
  Meteor.startup(function () {
    Messages.remove({});
    // code to run on server at startup
  });

  Meteor.methods({
    selectNext: function(pieceId, player){
      var game = currentGame();
      if(game == undefined){
        printSystemMessage(player, 'There is no game running.');
        return false;
      }
      if(findNextPiece(game.id) == undefined){
        var piece = findPiece(pieceId);
        piece.position = 'next';
        piece.save();
        printSystemMessage(player, 'Selected a piece.');
        return true;
      }
      return false;
    },
    setPiece: function(position, player){
      var game = currentGame();
      var ret = { status: false, win: false }
      if(game == undefined){
        printSystemMessage(player, 'There is no game running.');
        return ret;
      }
      var next = findNextPiece(game.id);
      if (next !== undefined){
        next.position = position;
        next.save();
        printSystemMessage(player, 'Placed a piece.');
        ret.status = true;

        if (didAnyoneWin(position, game)){
          endGame(true, game, player);
          ret.win = true;
        } else if (Pieces.find({position: { $in: [null, 'next']}, game_id: game.id}).fetch().length == 0){
          endGame(false, game, player);
        }
      }
      return ret;
    }
  });

  printSystemMessage = function(player, message){
    var message = new Message(null, player, message, true);
    message.save();
  }
  findPiece = function(id){
    return Pieces.findOne({ _id: id });
  }
  findNextPiece = function(game_id) {
    return Pieces.findOne({ position: "next", game_id: game_id });
  }

  function endGame(victory, game, player){
    game.finnished = true;
    game.save();
    if( victory ) {
      win(player);
    } else {
      printSystemMessage(player, 'Placed the last piece and it is a tie.');
    }
  }

  function win(player) {
    printSystemMessage(player, 'Won!!!!');
  }

  function didAnyoneWin(i, game){
    var groups = getGroups(i, game.advanced);
    var l = groups.length;
    for (i = 0; i < l; i++){
      var group = groups[i];
      var pieces = Pieces.find({position: {$in: group}, game_id: game.id}).fetch();
      if(pieces.length == 4){
        var win = 15;
        var win_reverse = 15;
        for (j = 0; j < 4; j++){
          win = win&pieces[j].key;
          win_reverse = win_reverse&(15-pieces[j].key)
        }
        if (win || win_reverse){
          for (j = 0; j < 4; j++){
            pieces[j].winning_group = true;
            pieces[j].save();
          }
          return true;
        }
      }
    }
    return false;
  }
}