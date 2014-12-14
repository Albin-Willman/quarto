"use strict";

describe('Messages', function() {
  it('Should be created with a player, a message and a system status', function() {
    spyOn(Messages, "insert").and.callFake(function(doc, callback){
      callback(null, "1");
    });
    spyOn(Date, "now").and.callFake(function(){
      return "right_now";
    });

    var message = new Message(null, 'Name', 'Message', false);

    expect(message.message).toBe('Message');
    expect(message.player).toBe('Name');
    expect(message.system).toBe(false);

    message.save();

    expect(message.id).toEqual("1");
    expect(Messages.insert).toHaveBeenCalledWith({ message: "Message", player: "Name", time: 'right_now', system: false }, jasmine.any(Function));

  });

});