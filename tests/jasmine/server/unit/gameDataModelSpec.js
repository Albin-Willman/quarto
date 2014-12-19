"use strict";
describe('Games', function() {
  var piece_id;
  var game;

  beforeEach(function(){
    spyOn(Games, "insert").and.callFake(function(doc, callback){
      callback(null, "1");
    });
    var piece_id = 1;
    spyOn(Pieces, "insert").and.callFake(function(doc, callback){
      callback(null, piece_id);
      piece_id++;
    });
    spyOn(Date, "now").and.callFake(function(){
      return "right_now";
    });
    spyOn(Pieces, "find").and.callFake(function(doc, callback){
      return {fetch: function(){}};
    });
    spyOn(Pieces, "findOne").and.callFake(function(doc, callback){
      return {fetch: function(){}};
    });
    spyOn(Math, 'random').and.callFake(function(doc, callback){
      return 0;
    });
    game = new Game(null, false);
  });


  it('Should be created with an advanced option, no players and finnished as false', function() {
    expect(game.advanced).toBe(false);
    expect(game.finnished).toBe(false);
    expect(game.player1).toBe(undefined);
    expect(game.player2).toBe(undefined);

    game.save();

    expect(game.id).toEqual("1");
    expect(Games.insert).toHaveBeenCalledWith({
      advanced: false,
      player1_id: null,
      player2_id: null,
      finnished: false,
      turn: 0,
      created_at: 'right_now' }, jasmine.any(Function));
    expect(Pieces.insert).toHaveBeenCalledWith({
        key: 0,
        position: null,
        class: 'piece short dark square hole',
        winning_group : undefined,
        game_id: "1"
      }, jasmine.any(Function));
    expect(Pieces.insert.calls.count()).toBe(16);

  });

  it('Should game should be able to find it`s pieces', function(){
    game.save();
    game.pieces;
    expect(Pieces.find).toHaveBeenCalledWith({game_id: "1"});
  });

  it('Should game should be able to find the piece', function(){
    game.save();
    game.next;
    expect(Pieces.findOne).toHaveBeenCalledWith({position: 'next', game_id: "1"});
  });

  it('Should game should be able to find it`s pieces', function(){
    game.save();
    game.unusedPieces;
    expect(Pieces.find).toHaveBeenCalledWith({position : null, game_id: "1"});
  });
  it('Should game should be able to find the piece', function(){
    game.save();
    game.piece('3');
    expect(Pieces.findOne).toHaveBeenCalledWith({_id: '3', game_id: "1"});
  });
  it('Should game should be able to find the piece', function(){
    game.save();
    game.pieceByPos(6);
    expect(Pieces.findOne).toHaveBeenCalledWith({position: 6, game_id: "1"});
  });

});