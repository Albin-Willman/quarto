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
  for (y = col ; y < col + 2 ; y++) {
    for (x = row ; x < row + 2 ; x++){
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

  for (yy = col - 1 ; yy < col + 1 ; yy++) {
    if (yy == - 1 || yy == size - 1) {
      continue;
    }
    for (xx = row - 1 ; xx < row + 1 ; xx++) {
      if (xx == -1 || xx == size - 1) {
        continue;
      }
      squares.push(getSubSquare((xx+3*yy)));
    }
  }
  return squares;
}

getGroups = function(i){
  var groups = [];
  groups.push(getRow(i));
  groups.push(getCol(i));
  groups.push(getDiagonal(i));
  return groups;
}
