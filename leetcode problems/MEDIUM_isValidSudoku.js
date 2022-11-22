/*
 https://leetcode.com/problems/valid-sudoku/description/
 @param {character[][]} board
 @return {boolean}
 
 Runtime: 133 ms (beats 47.99%)
 Memory: 45.5 MB (beats 50.44%)
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
    // check for 3x3 grids
    let box = ["","","","","","","","","",""];
    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            box[0] += board[r][c];
            box[1] += board[r][c+3];
            box[2] += board[r][c+6];            
        }
    }
    for(let r=3;r<6;r++){
        for(let c=0;c<3;c++){
            box[3] += board[r][c];
            box[4] += board[r][c+3];
            box[5] += board[r][c+6];            
        }
    }
    for(let r=6;r<9;r++){
        for(let c=0;c<3;c++){
            box[6] += board[r][c];
            box[7] += board[r][c+3];
            box[8] += board[r][c+6];            
        }
    }    
    // check for duplicates in each box
    for(let j=0;j<box.length;j++){
        let str=box[j].replace(/\./gm,'').split("");
        for(let k=0;k<str.length-1;k++){
            if(str.indexOf(str[k],k+1)!=-1){
                return false;
            }
        }
    }
    return true;
};
