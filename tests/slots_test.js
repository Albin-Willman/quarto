var assert = require('assert');

suite('Slots', function () {
  test('in the server', function (done, server) {
    server.eval(function (){
      var slots = Slots.find().fetch();
      emit('slots', slots);
    });

    server.once('slots', function(slots) {
      assert.equal(slots.length, 16);
      done();
    });

  });
});