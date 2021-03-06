Games = new Mongo.Collection("games", {
  transform: function(doc) {
    var game = new Game(doc._id, doc.advanced);
    game.player1 = doc.player1;
    game.player2 = doc.player2;
    game.finnished = doc.finnished;
    return game;
  }
});

Game = function(id, advanced){
  this._id        = id;
  this._advanced  = advanced;
  this._player1   = null;
  this._player2   = null;
  this.finnished  = false;
}

Game.prototype = {
  get id() {
    return this._id;
  },
  get player1() {
    return this._player1;
  },
  set player1(value){
    this._player1 = value;
  },
  get player2() {
    return this._player2;
  },
  set player2(value){
    this._player2 = value;
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
  piece: function(id){
    return Pieces.findOne({_id: id, game_id: this.id});
  },
  pieceByPos: function(pos){
    return Pieces.findOne({position: pos, game_id: this.id});
  },
  save: function() {
    var doc = { advanced:
      this.advanced,
      player1: this.player1,
      player2: this.player2,
      finnished: this.finnished
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