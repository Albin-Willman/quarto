Pieces = new Mongo.Collection("pieces");
Slots = new Mongo.Collection("slots");

if (Meteor.isClient) {
  Template.body.helpers({
    pieces: function () {
      return Pieces.find({ next: { $ne: true}, position: -100 })
    },
    slots: function () {
      return Slots.find({}, { sort: { position: 1 }});
    }
  });
  Template.next.helpers({
    next: function() {
      return Pieces.findOne({ next: true })
    }
  });
  Template.slot.helpers ({
    piece: function (){
      return Pieces.findOne({position: this.position})
    }
  });

  Template.slot.events ({
    'click a.free-slot': function (e){
      e.preventDefault();
      var position =this.position;
      Meteor.call('setPiece', position, getPlayerName(), function(error, selected){
        if(selected){
          $('.piece').removeClass('dissabled');
          $('.free-slot').addClass('dissabled');
          if(didAnyoneWin(position)){
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    setupNewBoard();
    Messages.remove({});
    Meteor.methods({
      newGame: function() {
        setupNewBoard();
      }
    })
    // code to run on server at startup
  });

  Meteor.methods({
    selectNext: function(pieceId, player){
      if(findNextPiece() == undefined){
        Pieces.update({_id: pieceId}, {$set: {next: true}});
        printSystemMessage(player, 'Selected a piece.');
        return true;
      }
      return false;
    },
    setPiece: function(position, player){
      next = findNextPiece();
      if (next !== undefined){
        Pieces.update({_id: next._id}, {$set: {next: false, position: position}});
        printSystemMessage(player, 'Placed a piece.');
        return true;
      }
      return false;
    }
  });

  printSystemMessage = function(player, message){
    Messages.insert({text: message, author: player, systemMessage: true, time: Date.now() });
  }

  findNextPiece = function() {
    return Pieces.findOne({ next: true })
  }

  setupNewBoard = function() {
    Pieces.remove({});
    Slots.remove({});
    for(i = 0; i < 16; i++){
      Pieces.insert({key: i, position: -100, class: pieceClass(i), next: false })
      Slots.insert({ position: i });
    }
  }
}

function didAnyoneWin(i){
  var groups = getGroups(i);
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
        var slots = Slots.find({position: {$in: group}}).fetch();
        for (j = 0; j < 4; j++){
          Slots.update({ _id: slots[j]._id }, { $set: { winning_group: true } });  
        }
        return true;
      }
    }
  }
  return false;
}

var evalForAllPositions = function(functionName){
  var res = {};
  for(i = 0; i < 16; i++){
    res[i] = eval(functionName+"(i)");
  }
}

function pieceClass(i){
  var classes = 'piece'
  classes += ' ' + getAttributeClass(i,1,'tall', 'short');
  classes += ' ' + getAttributeClass(i,2,'light', 'dark');
  classes += ' ' + getAttributeClass(i,4,'round', 'square');
  classes += ' ' + getAttributeClass(i,8,'flat', 'hole');
  return classes;
}

function getAttributeClass(i,m, posClas, negClass){
  if(i&m){
    return posClas;
  } else {
    return negClass;
  }
};