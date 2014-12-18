Games = new Mongo.Collection("games", {
  transform: function(doc) {
    var game = new Game(doc._id, doc.advanced);
    game.player1_id = doc.player1_id;
    game.player2_id = doc.player2_id;
    game.finnished = doc.finnished;
    game.turn = doc.turn;
    return game;
  }
});

Game = function(id, advanced){
  this._id        = id;
  this._advanced  = advanced;
  this._player1_id   = null;
  this._player2_id   = null;
  this._finnished  = false;
  this._turn = Math.floor(Math.random()) * 2;
}

Game.prototype = {
  get id() {
    return this._id;
  },
  get player1() {
    return Players.findOne({_id: this._player1_id});
  },
  set player1_id(value){
    this._player1_id = value;
  },
  get player2() {
    return Players.findOne({_id: this._player2_id});
  },
  set player2_id(value){
    this._player2_id = value;
  },
  get advanced() {
    return this._advanced;
  },
  get finnished() {
    return this._finnished;
  },
  set finnished(value){
    this._finnished = value;
  },
  get turn() {
    return this._turn;
  },
  set turn(value){
    this._turn = value;
  },
  get created_at() {
    return this._created_at;
  },
  get pieces(){
    return Pieces.find({game_id: this.id}).fetch();
  },
  get next(){
    return Pieces.findOne({position: 'next', game_id: this.id});
  },
  get unusedPieces(){
    return Pieces.find({position: null, game_id: this.id}).fetch();
  },
  get turnString(){
    switch(this._turn){
      case 0: return this.player1 + ' should select a piece.';
      case 1: return this.player2 + ' should place a piece.';
      case 2: return this.player2 + ' should select a piece.'
      case 3: return this.player1 + ' should place a piece.';
    }
  },
  nextTurn: function(){
    this.turn = (this.turn + 1)%4;
    this.save();
  },
  piece: function(id){
    return Pieces.findOne({_id: id, game_id: this.id});
  },
  pieceByPos: function(pos){
    return Pieces.findOne({position: pos, game_id: this.id});
  },
  save: function() {
    var doc = { advanced:
      this.advanced,
      player1_id: this._player1_id,
      player2_id: this._player2_id,
      finnished: this.finnished,
      turn: this.turn
    };
    var that = this;
    if(that.id){
      Games.update({ _id: that.id}, { $set: doc }, function(error, result) {
        that._id = result;
      });
    } else {
      doc['created_at'] = Date.now()
      Games.insert(doc, function(error, result) {
        that._id = result;
        for(i = 0; i < 16; i++){
          var piece = new Piece(null, i, null, result);
          piece.save();
        }
      });
    }
  }
};