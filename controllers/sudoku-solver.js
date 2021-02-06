const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
class SudokuSolver {

  checkAvaliable(puzzle, coordinate, value) {
    let puzzleArray = puzzle.split('');
    let validRow = this.checkRowPlacement(puzzleArray, coordinate, value);
    let validCol = this.checkColPlacement(puzzleArray, coordinate, value);
    let validReg = this.checkRegionPlacement(puzzleArray, value, validCol.columnRegion, validRow.rowRegion);

    let conflict = [];
    let mayBePlaced = true;

    if(!validRow.valid){
      conflict.push('row');
      mayBePlaced = false;
    }
    if(!validCol.valid){
      conflict.push('column');
      mayBePlaced = false;
    }
    if(!validReg){
      conflict.push('reigon');
      mayBePlaced = false;
    }
    return {valid: mayBePlaced, conflict: conflict};

  }






  CoordinateDecoder(coord) {
    let coordComponents = coord.split("");
    let result = (alphabet.indexOf(coordComponents[0])) * 9 + parseInt(coordComponents[1]) - 1;
    return result;
  }





  checkRowPlacement(puzzleArray, coordinate, value) {
    let coordComponents = coordinate.split('');

    let row = [];
    let alphaIndex = alphabet.indexOf(coordComponents[0]);
    for(let k = alphaIndex*9; k < alphaIndex*9+9; k++){
      row.push(puzzleArray[k]);
    }

    let rowRegion = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    let currentRowRegion;

    for(let j = 0; j < rowRegion.length; j++){
      if(rowRegion[j].indexOf(parseInt(coordComponents[1])) != -1){
        currentRowRegion = rowRegion[j];
      }
    }

    if(row.indexOf(value) != -1) {
      return { valid: false, rowRegion: currentRowRegion };
    }
    return { valid: true, rowRegion: currentRowRegion };
    
  }






  checkColPlacement(puzzleArray, coordinate, value) {
    let coordComponents = coordinate.split('');
    let column = [];

    for(let i = 0; i < 81; i++){
      if(i % 9 == coordComponents[1]-1){
        column.push(puzzleArray[i]);
      }
    }

    let columnRegion = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]];
    let currentColumnRegion;

    for(let m = 0; m < columnRegion.length; m++){
      if(columnRegion[m].indexOf(coordComponents[0]) != -1){
        currentColumnRegion = columnRegion[m];
      }
    }
    if(column.indexOf(value) != -1){
      return { valid: false, columnRegion: currentColumnRegion };
    }
    return { valid: true, columnRegion: currentColumnRegion };
  }






  checkRegionPlacement(puzzleArray, value, currentColumnRegion, currentRowRegion) {
    let region = [];

    for(let f = 0; f < currentColumnRegion.length; f++){
      for(let n = 0; n < currentRowRegion.length; n++){
        let currentCoord = currentColumnRegion[f]+currentRowRegion[n];
        region.push(puzzleArray[this.CoordinateDecoder(currentCoord)]);
      }
    }
    if(region.indexOf(value) != -1){
      return false;
    }
    return true;
  }

  solveSuduko(grid, row, col){

    if (row == 9 - 1 && col == 9) return grid;

    if (col == 9) {
      row++;
      col = 0;
    }

    if (grid[row][col] != 0) return this.solveSuduko(grid, row, col + 1);

    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        if (this.solveSuduko(grid, row, col + 1)) return grid;
    }
      grid[row][col] = 0;
    }

    return false;
  }
  

  isSafe(grid, row, col, num) {
  for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;

  for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false; 
  
  let startRow = row - row % 3, 
    startCol = col - col % 3;
  for (let i = 0; i < 3; i++) 
    for (let j = 0; j < 3; j++)
      if (grid[i + startRow][j + startCol] == num) return false;

  return true;

  }

  transform(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    ];
    let row = -1;
    let col = 0;
    for(let i = 0; i < puzzleString.length; i++) {
      if(i % 9 == 0){
        row++;
      }
      if(col % 9 == 0) {
        col = 0;
      }

      grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
      col++;
    }
    return grid;
  }
  transformBack(grid) {
    return grid.flat().join('');
  }
  solve(puzzleString) {
    if(/[^0-9.]/g.test(puzzleString) || puzzleString.length != 81){
      return false;
    }

    let grid = this.transform(puzzleString);
    let solved = this.solveSuduko(grid, 0, 0);
    if(!solved ){
      return false
    }
    let solvedString = this.transformBack(solved);
    return solvedString;
  }
}

module.exports = SudokuSolver;

