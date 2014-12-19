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
      spyOn(Math, 'random').and.callFake(function(doc, callback){
        return 1;
      });

      Meteor.call('newGame', true);
      expect(Games.insert).toHaveBeenCalledWith({
        advanced: true,
        player1_id: null,
        player2_id: null,
        finnished: false,
        turn: 2,
        created_at: 'right_now' }, jasmine.any(Function));

    });
  });


});