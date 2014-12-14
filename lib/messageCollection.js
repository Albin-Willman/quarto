Messages = new Mongo.Collection("messages", {
  transform: function(doc) {
    var message = new Message(doc._id, doc.player, doc.message, doc.system);
    message.time = doc.time;
    return message;
  }
});

Message = function(id, player, message, system){
  this._id = id;
  this._player = player;
  this._message = message;
  this._system = system;
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
  set time(val) {
    return this._time = val;
  },
  save: function() {
    var that = this;
    var doc = { message: this.message, player: this.player, system: this.system };

    if(that.id){
      Messages.update({ _id: that.id}, { $set: doc }, function(error, result) {
        that._id = result;
      });
    } else {
      doc['time'] = Date.now();
      Messages.insert(doc, function(error, result) {
        that._id = result;
      });
    }
  }
};