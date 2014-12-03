var assert = require('assert');

suite('Slots', function () {
  test('Initial state', function (done, server) {
    server.eval(function (){
      var slots = Slots.find({}).fetch();
      emit('slots', slots);
    });

    server.once('slots', function(slots) {
      assert.equal(slots.length, 16);
      
      var positions = {}
      for(i = 0; i < 16; i++){
        var slot = slots[i];
        assert.equal(positions[slot.position], null);
        positions[slot.position] = true;
      }

      done();
    });

  });
});