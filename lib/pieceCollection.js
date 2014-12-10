Pieces = new Mongo.Collection("pieces", {
  transform: function(doc) {
    return new Piece(doc._id, doc.key, doc.position, doc.winning_group);
  }
});
Piece = function(id, key, position, winning_group){
  this._id = id;
  this._position = position;
  this._key = key;
  this._winning_group = winning_group;
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
  get winning_group() {
      return this._winning_group;
  },
  set winning_group(value) {
      this._winning_group = value;
  },
  get class() {
      return this._class;
  },
  save: function() {
    var that = this;
    var doc = { key: this.key, position: this.position, class: this.class };
    if(this.id){
      Pieces.update({ _id: this.id }, { $set: doc }, function(error, result) {
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