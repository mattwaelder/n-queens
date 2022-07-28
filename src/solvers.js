/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


/////////////////////////////////////////////////////////////////////////

window.findNRooksSolution = function(n) {

  //create new board - base of tree
  let newBoard = new Board({n: n});
  let solution;

  let boardFinder = function (board, currRow = 0) {
    //base case:  currRow bigger than board
    if (currRow === n) {
      //store first viable solution in solution var
      solution = board.rows();
      return true;
    }

    //recursive helper fn

    //our loop iterates left to right along along columns
    for (let currColumn = 0; currColumn < n; currColumn++) {
      //add piece at current location
      board.togglePiece(currRow, currColumn);
      //if after adding piece, there is a conflict
      if (board.hasAnyRooksConflicts()) {
        //remove conflicting piece
        board.togglePiece(currRow, currColumn);
        continue;
      //if there are no conflicts with placed piece
      } else {
        //recursive call will eval to true in higher EC if its a solution
        if (boardFinder(board, (currRow + 1))) {
          //if true, cascade back (solution set in base case)
          return true;
        }
        board.togglePiece(currRow, currColumn);
      }
    }
  };

  boardFinder(newBoard);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

/*
    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },
*/

/////////////////////////////////////////////////////////////////////////

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  //create new board - base of tree
  let newBoard = new Board({n: n});

  let boardFinder = function (board, currRow = 0) {
    //base case:  currRow bigger than board

    if (currRow === n) {
      solutionCount++;
      return;
    }

    //recursive helper fn

    for (let currColumn = 0; currColumn < n; currColumn++) {
      board.togglePiece(currRow, currColumn);

      if (board.hasAnyRooksConflicts()) {
        //if conflict remove piece
        board.togglePiece(currRow, currColumn);
        continue;
      } else {
        boardFinder(board, (currRow + 1));
        board.togglePiece(currRow, currColumn);
      }
    }

    return solutionCount;

  };

  boardFinder(newBoard);

  //pretty sure that the solution to this is supposed to be n!

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

/////////////////////////////////////////////////////////////////////////

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // if (n === 0) {
  //   console.warn('0 passed in');
  //   let solution = 0;
  //   console.log(solution);
  //   return solution;
  // }
  var solution;

  var newBoard = new Board({n: n});

  let boardFinder = function (board, currRow = 0) {
    // debugger;

    if (currRow === n) {
      solution = board.rows();
      return true;
    }

    for (let currColumn = 0; currColumn < n; currColumn++) {
      board.togglePiece(currRow, currColumn);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(currRow, currColumn);
        continue;
      } else {
        if (boardFinder(board, (currRow + 1))) {
          return true;
        }
        board.togglePiece(currRow, currColumn);
      }
    }
  };

  boardFinder(newBoard);
  //if there is no solution, set solution to empty chest board of n size
  if (solution === undefined) {
    solution = new Board({n: n}).rows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};


/////////////////////////////////////////////////////////////////////////

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var newBoard = new Board({n: n});


  let boardFinder = function (board, currRow = 0) {


    if (currRow === n) {
      solutionCount++;
      return;
    }


    for (let currColumn = 0; currColumn < n; currColumn++) {
      //place piece
      board.togglePiece(currRow, currColumn);
      //if piece has issues
      if (board.hasAnyQueensConflicts()) {
        //remove piece
        board.togglePiece(currRow, currColumn);
        continue;
        //if piece has no issues
      } else {
        //move down a row and over a column (which is loop)
        boardFinder(board, (currRow + 1));
        //remove piece so we can check the next spot
        //without this, there would be 2 queens on the same row
        board.togglePiece(currRow, currColumn);
      }
    }
  };

  boardFinder(newBoard);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
