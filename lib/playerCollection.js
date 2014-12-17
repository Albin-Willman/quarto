Players = new Mongo.Collection("players", {
  transform: function(doc) {
    var player = new Player(doc._id, doc.name, doc.human);
    if (player.human == false){
      player.API  = doc.API;
    }
    return player;
  }
});

Player = function(id, name, human){
  this._id    = id;
  this._name  = name;
  this._human = human;
}

Player.prototype = {
  get id() {
    return this._id;
  },
  get API() {
    return this._API;
  },
  set API(value){
    this._API = value;
  },
  get name() {
    return this._name;
  },
  get human() {
    return this._human;
  },
  save: function() {
    var that = this;
    var doc = { 
      name: this.name, 
      human: this.human, 
      API: this.API
    };

    if(that.id){
      Players.update({ _id: that.id}, { $set: doc }, function(error, result) {
        that._id = result;
      });
    } else {
      Players.insert(doc, function(error, result) {
        that._id = result;
      });
    }
  }
  
}