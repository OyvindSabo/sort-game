class SortGame {
  
  constructor(width, height) {
    this.width = width;
    this.height = height || width;
    this.board = [];
    for (let y = 0; y < height; y++) {
      this.board.push([]);
      for (let x = 1; x <= width; x++) {
        this.board[y].push(x+y*width)
      }
    }
  }

  /*****************************************************************************
   * UTILITY METHODS
   ****************************************************************************/

  toListOfColumns (listOfRows) {
    let listOfColumns = [];
    for (let x = 0; x < listOfRows[0].length; x++) {
      listOfColumns.push([]);
      for (let y = 0; y < listOfRows.length; y++) {
        listOfColumns[x].push(listOfRows[y][x]);
      }
    }
    return listOfColumns;
  }

  toListOfRows (listOfColumns) {
    let listOfRows = [];
    for (let y = 0; y < listOfColumns[0].length; y++) {
      listOfRows.push([]);
      for (let x = 0; x < listOfColumns.length; x++) {
        listOfRows[y].push(listOfColumns[x][y]);
      }
    }
    return listOfRows;
  }

  equalArrays (array1, array2) {
    return array1.map((e, i) => e === array2[i] ? 0 : 1)
                 .reduce((a, b) => a + b) === 0;
  }

  /*****************************************************************************
   * PUBLIC API
   ****************************************************************************/

  getBoard () {
    return this.board;
  }

  getHeight () {
    return this.height;
  }

  getWidth () {
    return this.width;
  }

  sort (rowCol, index, ascDesc) {
    if (rowCol === 'col') {
      if (ascDesc === 'asc') {
        this.board.sort((row1, row2) =>  row1[index] - row2[index]);
      } else if (ascDesc === 'desc') {
        this.board.sort((row1, row2) =>  row1[index] - row2[index]).reverse();
      }
    } else if (rowCol === 'row') {
      if (ascDesc === 'asc') {
        this.board = this.toListOfRows(
                     this.toListOfColumns(
                     this.board).sort((row1, row2) =>  row1[index] - row2[index]));
      } else if (ascDesc === 'desc') {
        this.board = this.toListOfRows(
        this.toListOfColumns(
        this.board).sort((row1, row2) =>  row1[index] - row2[index]).reverse());
      }
    }
  }

  hasWon () {
    const flatBoard = [].concat.apply([], this.board);
    return this.equalArrays([...flatBoard].sort((a, b) => a - b), flatBoard);
  }

}
/*
let game = new SortGame(4,5);
game.sort('col', 1);
game.sort('col', 1);
console.log(game.getBoard());
console.log(game.hasWon());
*/
