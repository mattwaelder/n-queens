// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      let row = this.get(rowIndex);
      //this is a total for that row
      let rowTotal = row.reduce((a, b) => a + b, 0);
      // rowTotal === 0 ? false : true;
      if (rowTotal > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // return false; // fixme
      //for all of the rows (n) call rowConflicAt
      let hasAnyConflict = false;
      for (i = 0; i < this.get('n'); i++) {
        if (this.hasRowConflictAt(i)) {
          hasAnyConflict = true;
        }
      }
      return hasAnyConflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let columnCount = 0;
      for (let i = 0; i < this.get('n'); i++) {
        //this.get(i) = array at i'th index
        if (this.get(i)[colIndex] === 1) {
          columnCount++;
        }
      }
      if (columnCount > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let hasAnyConflict = false;
      for (let i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
          hasAnyConflict = true;
        }
      }
      return hasAnyConflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // provided with an index
      // could be negative for bottom-left board

      let diagonalCount = 0;

      let currColumnIndex = majorDiagonalColumnIndexAtFirstRow;
      let currRowIndex = 0;

      //if index is not valid
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        //add one to it & move down a row
        //do this until valid
        while (currColumnIndex < 0) {
          currColumnIndex++;
          currRowIndex++;
        }
        //when index is valid
        //check if value > 0;
      }

      //while both indexes are less than N
      while (currColumnIndex < this.get('n') &&
      currRowIndex < this.get('n')) {
        //if this pos is a queen
        if (this.get(currRowIndex)[currColumnIndex] > 0) {
          diagonalCount++;
        }
        currColumnIndex++;
        currRowIndex++;
      }

      if (diagonalCount > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let hasAnyConflict = false;
      let n = this.get('n'); //finally, right?

      for (let i = (-n + 1); i < n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          hasAnyConflict = true;
        }
      }

      return hasAnyConflict;//our above fn is busted (when i test it)

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {


      let diagonalCount = 0;

      let currColumnIndex = minorDiagonalColumnIndexAtFirstRow;
      let currRowIndex = 0;
      let n = this.get('n');

      //if index is not valid
      if (minorDiagonalColumnIndexAtFirstRow > (n - 1)) {
        //subtract one to it & move down a row
        //do this until valid
        while (currColumnIndex > (n-1)) {
          currColumnIndex--;
          currRowIndex++;
        }
      }

      //while on board
      while (currColumnIndex < this.get('n') &&
      currRowIndex < this.get('n')) {
        //if this pos is a queen
        if (this.get(currRowIndex)[currColumnIndex] > 0) {
          diagonalCount++;
        }
        currColumnIndex--;
        currRowIndex++;
      }

      if (diagonalCount > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let hasAnyConflict = false;
      let n = this.get('n'); //finally, right?

      for (let i = 0; i < ((2 * n) - 1); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          hasAnyConflict = true;
        }
      }

      return hasAnyConflict;//our above fn is busted (when i test it)
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
