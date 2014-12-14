Pieces = new Mongo.Collection("pieces", {
  transform: function(doc) {
    var piece = new Piece(doc._id, doc.key, doc.position, doc.game_id);
    piece.winning_group = doc.winning_group;
    return piece;
  }
});
Piece = function(id, key, position, game_id){
  this._id = id;
  this._position = position;
  this._key = key;
  this._class = pieceClass(key);
  this._game_id = game_id;
}

Piece.prototype = {
  get id() {
      // readonly
      return this._id;
  },
  get position() {
      return this._position;
  },
  set position(value) {
      this._position = value;
  },
  get key() {
      return this._key;
  },
  set key(value) {
      this._key = value;
  },
  get winning_group() {
      return this._winning_group;
  },
  set winning_group(value) {
      this._winning_group = value;
  },
  get game_id() {
      return this._game_id;
  },
  get class() {
      return this._class;
  },
  save: function() {
    var doc = {
                key: this.key,
                position: this.position,
                class: this.class,
                winning_group: this.winning_group,
                game_id: this.game_id
              };

    var that = this;
    if(that.id){
      Pieces.update({ _id: that.id}, { $set: doc }, function(error, result) {
        that._id = result;
      });
    } else {
      Pieces.insert(doc, function(error, result) {
        that._id = result;
      });
    }
  }
};

pieceClass = function(i){
  var classes = 'piece'
  classes += ' ' + getAttributeClass(i,1,'tall', 'short');
  classes += ' ' + getAttributeClass(i,2,'light', 'dark');
  classes += ' ' + getAttributeClass(i,4,'round', 'square');
  classes += ' ' + getAttributeClass(i,8,'flat', 'hole');
  return classes;
}

function getAttributeClass(i, m, posClas, negClass){
  if(i&m){
    return posClas;
  } else {
    return negClass;
  }
};