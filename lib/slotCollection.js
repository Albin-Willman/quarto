Slots = new Mongo.Collection("slots");

Slot = function(id, position){
  this._id = id;
  this._position = position;
}

Slot.prototype = {
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
  save: function() {
    var that = this;
    var doc = {position: this.position};

    Slots.insert(doc, function(error, result) {
        that._id = result;
    });
  }
};