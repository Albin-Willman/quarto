Games = new Mongo.Collection("games", {
  transform: function(doc) {
    return new Game(doc._id);
  }
});

Game = function(id, advanced){
  this._id = id;
  this._advanced = advanced;
  this._player1 = null;
  this._player2 = null;
  this.won = false;
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
  get won() {
    return this._won;
  },
  set won(value){
    this._won = value;
  },
  save: function() {
    var that = this;
    var doc = { advanced: this.advanced, player1: this.player1, player2: this.player2, won: this.won };

    Games.insert(doc, function(error, result) {
      that._id = result;
    });
  }
};