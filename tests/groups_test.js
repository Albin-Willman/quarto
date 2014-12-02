var assert = require('assert');

suite('Groups', function () {
  function verifyForEachPostion(res, expected){
    for(i = 0; i < 16; i++){
      assert.equal(res[i], expected[i]);
    }
  }
  
  test('in the server', function(done, server){
    server.eval(function (){
      var rows = evalForAllPositions('getRow');
      emit('rows', rows);
    });

    server.once('rows', function(rows){
      var expected = [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3],
                      [4,5,6,7],[4,5,6,7],[4,5,6,7],[4,5,6,7],
                      [8,9,10,11],[8,9,10,11],[8,9,10,11],[8,9,10,11],
                      [12,13,14,15],[12,13,14,15],[12,13,14,15],[12,13,14,15]];

      verifyForEachPostion(rows, expected);
      done();
    });
  });
});
 
