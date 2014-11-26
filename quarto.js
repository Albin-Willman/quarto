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
      return Pieces.findOne({next: true})
    }
  });
  Template.slot.helpers ({
    piece: function (){
      return Pieces.findOne({position: this.position})
    }
  });

  Template.body.events ({
    'click #send': function (e){
      var message = $("#message").val();
      var name = $("#player_name").val();
      Messages.insert({text: message, author: name, time: Date.now() });
      $("#message").val('');
    }
  });


  Template.slot.events ({
    'click a.free-slot': function (e){
      e.preventDefault();
      $next = $('.next');
      if ($next.length > 0){
        Pieces.update({_id: $next.attr('data-piece-id')}, {$set: {next: false, position: this.position}});
        $('.piece').removeClass('dissabled');
        $('.free-slot').addClass('dissabled');
        if(didAnyoneWin(this.position)){
          $('.restart').show();
          alert('you won!');
        }
      }
    }
  });
  Template.piece.events ({
    'click a.piece': function(e){
      e.preventDefault();
      if(isNextSlotFree()){
        Pieces.update({_id: this._id}, {$set: {next: true}});
        $('.piece').addClass('dissabled');
        $('.free-slot').removeClass('dissabled');
      }
    }
  })

  function isNextSlotFree(){
    return $('.next').length == 0;
  }


}



if (Meteor.isServer) {
  Meteor.startup(function () {
    setupNewBoard();
    Meteor.methods({
      newGame: function() {
        setupNewBoard();
      }
    })
    // code to run on server at startup
  });
  setupNewBoard = function() {
    Pieces.remove({});
    Slots.remove({});
    for(i = 0; i < 16; i++){
      Pieces.insert({key: i, position: -100, class: pieceClass(i), next: false })
      Slots.insert({position: i});
    }
  }
}

function getRow(i){
  var base = i - (i%4);
  var row = [base];
  for (j = 1; j < 4; j++){
    row.push(base + j);
  }
  return row;
}

function getCol(i){
  var base = (i%4);
  var col = [base];
  for (j = 1; j < 4; j++){
    col.push(base + 4*j);
  }
  return col;
}

function getDiagonal(i){
  if(i%5 == 0){
    return [0,5,10,15];
  } else if (i%3 == 0 && i != 0 && i != 15){
    return [3,6,9,12];
  } else {
    return [];
  }
}

function getGroups(i){
  var groups = [];
  groups.push(getRow(i));
  groups.push(getCol(i));
  groups.push(getDiagonal(i));
  return groups;
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

function pieceClass(i){
  var classes = 'piece'
  classes += ' ' +getAttributeClass(i,1,'tall', 'short');
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