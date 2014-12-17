"use strict";

describe('Players', function() {
  it('Should be created with a player, a message and a system status', function() {
    spyOn(Players, "insert").and.callFake(function(doc, callback){
      callback(null, "1");
    });
    spyOn(Date, "now").and.callFake(function(){
      return "right_now";
    });

    var player = new Player(null, 'Name', false);

    expect(player.name).toBe('Name');
    expect(player.human).toBe(false);

    player.save();

    expect(player.id).toEqual("1");
    expect(Players.insert).toHaveBeenCalledWith({  name : 'Name', human : false, API : undefined }, jasmine.any(Function));

  });

});