var assert = require('assert');

suite('Pieces', function () {
  test('in the server', function (done, server) {
    server.eval(function (){
      var pieces = Pieces.find().fetch();
      emit('pieces', pieces);
    });

    server.once('pieces', function(pieces) {
      assert.equal(pieces.length, 16);
      
      var keys = {}
      for(i = 0; i < 16; i++){
        var piece = pieces[i];
        assert.equal(keys[piece.key], null);
        keys[piece.position] = true;
        assert.equal(piece.position, -100);
      }
      
      done();
    });

  });
});