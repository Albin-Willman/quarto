"use strict";

describe('Games', function() {
  it('Should be created with an advanced option, no players and finnished as false', function() {
    spyOn(Games, "insert").and.callFake(function(doc, callback){
      callback(null, "1");
    });

    var game = new Game(null, false);

    expect(game.advanced).toBe(false);
    expect(game.finnished).toBe(false);
    expect(game.player1).toBe(null);
    expect(game.player2).toBe(null);

    game.save();

    expect(game.id).toEqual("1");
    expect(Games.insert).toHaveBeenCalledWith({ advanced: false, player1: null, player2: null, finnished: false }, jasmine.any(Function));

  });

});