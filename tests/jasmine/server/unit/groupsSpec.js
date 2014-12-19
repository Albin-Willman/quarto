"use strict";
describe('Groups', function() {

  it('should calculate the row from a position', function() {
    var cases = getTestCases();

    for(var i = 0; i < 16; i++){
      expect(getRow(i)).toEqual(cases[i].row);
    }
  });

  it('should calculate the column from a position', function() {
    var cases = getTestCases();

    for(var i = 0; i < 16; i++){
      expect(getCol(i)).toEqual(cases[i].col);
    }
  });

  it('should calculate the diagonal from a position if it exists', function() {
    var cases = getTestCases();

    for(var i = 0; i < 16; i++){
      expect(getDiagonal(i)).toEqual(cases[i].diag);
    }
  });

  it('should combine all the results to one array for a position', function() {
    var cases = getTestCases();

    for(var i = 0; i < 16; i++){
      var expected = [cases[i].row, cases[i].col, cases[i].diag];
      expect(getGroups(i)).toEqual(expected);
    }
    for(var i = 0; i < 16; i++){
      var expected = [cases[i].row, cases[i].col, cases[i].diag].concat(cases[i].squares);
      expect(getGroups(i,true)).toEqual(expected);
    }
  });

  it('should return all squares for a position', function() {
    var cases = getTestCases();
    for (var i = 0 ; i < 16 ; i++) {
      expect(getSquares(i)).toEqual(cases[i].squares);
    }
  });  
});

function getTestCases(){
  var cases = [
    {pos: 0, row: [0,1,2,3], col: [0,4,8,12], diag: [0,5,10,15], squares: [[0,1,4,5]]},
    {pos: 1, row: [0,1,2,3], col: [1,5,9,13], diag: [], squares: [[0,1,4,5],[1,2,5,6]]},
    {pos: 2, row: [0,1,2,3], col: [2,6,10,14], diag: [], squares: [[1,2,5,6],[2,3,6,7]]},
    {pos: 3, row: [0,1,2,3], col: [3,7,11,15], diag: [3,6,9,12], squares: [[2,3,6,7]]},

    {pos: 4, row: [4,5,6,7], col: [0,4,8,12], diag: [], squares: [[0,1,4,5],[4,5,8,9]]},
    {pos: 5, row: [4,5,6,7], col: [1,5,9,13], diag: [0,5,10,15], squares: [[0,1,4,5],[1,2,5,6],[4,5,8,9],[5,6,9,10]]},
    {pos: 6, row: [4,5,6,7], col: [2,6,10,14], diag: [3,6,9,12], squares: [[1,2,5,6],[2,3,6,7],[5,6,9,10],[6,7,10,11]]},
    {pos: 7, row: [4,5,6,7], col: [3,7,11,15], diag: [], squares: [[2,3,6,7],[6,7,10,11]]},

    {pos: 8, row: [8,9,10,11], col: [0,4,8,12], diag: [], squares: [[4,5,8,9],[8,9,12,13]] } ,
    {pos: 9, row: [8,9,10,11], col: [1,5,9,13], diag: [3,6,9,12], squares: [[4,5,8,9],[5,6,9,10],[8,9,12,13],[9,10,13,14]]},
    {pos: 10, row: [8,9,10,11], col: [2,6,10,14], diag: [0,5,10,15], squares: [[5,6,9,10],[6,7,10,11],[9,10,13,14],[10,11,14,15]]},
    {pos: 11, row: [8,9,10,11], col: [3,7,11,15], diag: [], squares: [[6,7,10,11],[10,11,14,15]]},

    {pos: 12, row: [12,13,14,15], col: [0,4,8,12], diag: [3,6,9,12], squares: [[8,9,12,13]]},
    {pos: 13, row: [12,13,14,15], col: [1,5,9,13], diag: [], squares: [[8,9,12,13],[9,10,13,14]]},
    {pos: 14, row: [12,13,14,15], col: [2,6,10,14], diag: [], squares: [[9,10,13,14],[10,11,14,15]]},
    {pos: 15, row: [12,13,14,15], col: [3,7,11,15], diag: [0,5,10,15], squares: [[10,11,14,15]]}
  ];
  return cases;
}
