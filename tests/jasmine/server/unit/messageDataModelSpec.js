"use strict";

describe('Messages', function() {
  it('Should be created with a player, a message and a system status', function() {
    spyOn(Messages, "insert").and.callFake(function(doc, callback){
      callback(null, "1");
    });

    var message = new Message(null, 'Name', 'Message', 'time', false);

    expect(message.message).toBe('Message');
    expect(message.player).toBe('Name');
    expect(message.time).toBe('time');
    expect(message.system).toBe(false);

    message.save();

    expect(message.id).toEqual("1");
    expect(Messages.insert).toHaveBeenCalledWith({ message: "Message", player: "Name", time: 'time', system: false }, jasmine.any(Function));

  });

});