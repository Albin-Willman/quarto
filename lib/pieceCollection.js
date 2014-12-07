
Pieces = new Mongo.Collection("pieces");
Piece = function(id, key, position){
  this._id = id;
  this._position = position;
  this._key = key;
  this._class = pieceClass(key);
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
  get class() {
      return this._class;
  },
  save: function() {
    var that = this;
    var doc = { key: this.key, position: this.position, class: this.class };

    Pieces.insert(doc, function(error, result) {
        that._id = result;
    });
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