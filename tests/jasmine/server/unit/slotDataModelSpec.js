"use strict";

describe('Slots', function() {
  it("Should be created with a position", function(){
    spyOn(Slots, "insert").and.callFake(function(doc, callback){
      callback(null, "1");
    });

    var slot = new Slot(null, 1);
 
    expect(slot.position).toBe(1);

    slot.save();

    expect(slot.id).toEqual("1");
    expect(Slots.insert).toHaveBeenCalledWith({position: 1}, jasmine.any(Function));

  });
});