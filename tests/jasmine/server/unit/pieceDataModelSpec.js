"use strict";

describe('Pieces', function() {
  it("Should be created with a position", function(){
    spyOn(Pieces, "insert").and.callFake(function(doc, callback){
      callback(null, "1");
    });

    var piece = new Piece(null, 0, -100, 'test', false);
 
    expect(piece.key).toBe(0);
    expect(piece.position).toBe(-100);
    expect(piece.class).toBe('test');
    expect(piece.next).toBe(false);

    piece.save();

    expect(piece.id).toEqual("1");
    expect(Pieces.insert).toHaveBeenCalledWith({key: 0, position: -100, class: 'test', next: false}, jasmine.any(Function));

  });
});