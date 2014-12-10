Messages = new Mongo.Collection("messages", {
  transform: function(doc) {
    return new Message(doc._id, doc.player, doc.message, doc.time, doc.system);
  }
});

Message = function(id, player, message, time, system){
  this._id = id;
  this._player = player;
  this._message = message;
  this._system = system;
  this._time = time;
}

Message.prototype = {
  get id() {
    return this._id;
  },
  get player() {
    return this._player;
  },
  get message() {
    return this._message;
  },
  get system() {
    return this._system;
  },
  get time() {
    return this._time;
  },
  save: function() {
    var that = this;
    var doc = { message: this.message, player: this.player, time: this.time, system: this.system };

    Messages.insert(doc, function(error, result) {
      that._id = result;
    });
  }
};