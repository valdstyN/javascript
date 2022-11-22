[WIP]

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    let valid = true;
    // check for duplicates on a row
    let line = "";
    for(let r=0;r<9;r++){
        line = "";
        for(let c=0;c<9;c++){
            if(board[r][c]!="." && line.indexOf(board[r][c])!=-1){
                return false;
            }else{
                line += board[r][c];
            }
        }
    }
    // check for duplicates in a column
    for(let c=0;c<9;c++){
        line = "";
        for(let r=0;r<9;r++){
            if(board[r][c]!="." && line.indexOf(board[r][c])!=-1){
                return false;
            }else{
                line += board[r][c];
            }
        }
    }
  // check for 3x" grids
};
