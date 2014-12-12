getRow = function(i){
  var base = i - (i%4);
  var row = [base];
  for (j = 1; j < 4; j++){
    row.push(base + j);
  }
  return row;
}

getCol = function(i){
  var base = (i%4);
  var col = [base];
  for (j = 1; j < 4; j++){
    col.push(base + 4*j);
  }
  return col;
}

getDiagonal = function(i){
  if(i%5 == 0){
    return [0,5,10,15];
  } else if (i%3 == 0 && i != 0 && i != 15){
    return [3,6,9,12];
  } else {
    return [];
  }
}

getSubSquare = function(i){
  var row = (i%3);
  var col = (i/3) >> 0;
  var square = [];
  for (var y = col ; y < col + 2 ; y++) {
    for (var x = row ; x < row + 2 ; x++){
      square.push(x+4*y);
    }
  }
  return square;
}

getSquares = function(i){
  var size = 4;
  var row = (i%size);
  var col = (i/size) >> 0;
  var squares = [];

  for (var y = col - 1 ; y < col + 1 ; y++) {
    if (y == - 1 || y == size - 1) {
      continue;
    }
    for (var x = row - 1 ; x < row + 1 ; x++) {
      if (x == -1 || x == size - 1) {
        continue;
      }
      squares.push(getSubSquare((x+3*y)));
    }
  }
  return squares;
}

getGroups = function(i, includeSquares){
  var groups = [];
  groups.push(getRow(i));
  groups.push(getCol(i));
  groups.push(getDiagonal(i));
  if(includeSquares){
    var squares = getSquares(i);
    for (var j = 0; j < squares.length; j++){
      groups.push(squares[i]) 
    }
  }
  return groups;
}
