
Pieces = new Mongo.Collection("pieces");
Piece = function(id, key, position, classname, next){
  this._id = id;
  this._position = position;
  this._key = key;
  this._class = classname;
  this._next = next;
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
  set class(value) {
      this._class = value;
  },
  get next() {
      return this._next;
  },
  set next(value) {
      this._next = value;
  },
  save: function() {
    var that = this;
    var doc = { key: this.key, position: this.position, class: this.class, next: this.next };

    Pieces.insert(doc, function(error, result) {
        that._id = result;
    });
  }
};