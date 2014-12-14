Messages = new Mongo.Collection("messages", {
  transform: function(doc) {
    var message = new Message(doc._id, doc.player, doc.message, doc.system);
    message.created_at = doc.created_at;
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
  get created_at() {
    return this._created_at;
  },
  set created_at(val) {
    return this._created_at = val;
  },
  save: function() {
    var that = this;
    var doc = { message: this.message, player: this.player, system: this.system };

    if(that.id){
      Messages.update({ _id: that.id}, { $set: doc }, function(error, result) {
        that._id = result;
      });
    } else {
      doc['created_at'] = Date.now();
      Messages.insert(doc, function(error, result) {
        that._id = result;
      });
    }
  }
};