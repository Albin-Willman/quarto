"use strict";

describe('Game methods', function() {

  describe('New game', function() {
    it('Should set up a new game with pieces', function() {
      spyOn(Games, "insert").and.callFake(function(doc, callback){
        callback(null, "1");
      });
      spyOn(Date, "now").and.callFake(function(){
        return "right_now";
      });

      Meteor.call('newGame', true);
      expect(Games.insert).toHaveBeenCalledWith({ 
        advanced: true, 
        player1: null, 
        player2: null, 
        finnished: false,
        created_at: 'right_now' }, jasmine.any(Function));

    });
  });

});