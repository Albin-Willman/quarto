if (Meteor.isServer) {
  Meteor.startup(function () {
    setupNewGame(false);
    Messages.remove({});
    // code to run on server at startup
  });

  Meteor.methods({
    selectNext: function(pieceId, player){
      if(findNextPiece() == undefined){
        var piece = findPiece(pieceId);
        piece.position = 'next';
        piece.save();
        printSystemMessage(player, 'Selected a piece.');
        return true;
      }
      return false;
    },
    setPiece: function(position, player){
      var next = findNextPiece();
      var ret = { status: false, win: false }
      if (next !== undefined){
        next.position = position;
        next.save();
        printSystemMessage(player, 'Placed a piece.');
        ret.status = true;
        if (didAnyoneWin(position)){
          endCurrentGame(true);
          ret.win = true;
        }
      }
      return ret;
    }
  });

  printSystemMessage = function(player, message){
    var message = new Message(null, player, message, Date.now(), true);
    message.save();
  }
  findPiece = function(id){
    return Pieces.findOne({ _id: id });
  }
  findNextPiece = function() {
    return Pieces.findOne({ position: "next" });
  }

  function endCurrentGame(win){
    var game = Meteor.call('currentGame');
    game.finnished = true;
    game.save();
    if( win ) {
      win(player);
    } else {

    }
  }

  function win(player) {
    printSystemMessage(player, 'Won!!!!');
  }

  function didAnyoneWin(i){
    var groups = getGroups(i, false);
    var l = groups.length;
    for (i = 0; i < l; i++){
      var group = groups[i];
      var pieces = Pieces.find({position: {$in: group}}).fetch();
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