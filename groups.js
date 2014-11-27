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

getGroups = function(i){
  var groups = [];
  groups.push(getRow(i));
  groups.push(getCol(i));
  groups.push(getDiagonal(i));
  return groups;
}