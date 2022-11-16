
    var cellToCheck = new Array();

    function newGame(difficulty){
      cellToCheck = [];
      switch(difficulty){
        case 0:
          var maxRow = 9;
          var maxCol = 9;
          var nbMines = 10;
        break;
        case 1:
          var maxRow = 16;
          var maxCol = 16;
          var nbMines = 40;
        break;
        case 2:
        var maxRow = 30;
        var maxCol = 16;
        var nbMines = 99;
        break;
      }

      // create the grid
      document.getElementsByClassName("grid")[0].innerHTML = "";
      minefield = [new Array()];
      for(var y = 0; y<maxCol; y++){
        let c = document.createElement("div");
        c.className = "row";
        minefield[y] = [];
        document.getElementsByClassName("grid")[0].append(c);
        for(var x = 0; x<maxRow; x++){
          let d = document.createElement("div");
          d.className = "cell y"+y +" x"+x;
          document.getElementsByClassName("row")[y].append(d);
          minefield[y][x] = 0;
        }
      }

      // put the mines
      while(nbMines>0){
            rdx = Math.floor(Math.random()*(maxRow));
            rdy = Math.floor(Math.random()*(maxCol));
            if(minefield[rdy][rdx]!=1){
              minefield[rdy][rdx] = 1;
              document.querySelectorAll(".y"+rdy+".x"+rdx)[0].className += " bombcover";
              nbMines--;
            }
      }

      // handle mouseclicks
      var el = document.getElementsByClassName("cell");
      for(var u = 0; u<el.length; u++){
        el[u].addEventListener("contextmenu", ( e )=> { e.preventDefault(); return false; });
        el[u].addEventListener("mousedown",function(e){
          e.preventDefault();

          // handle mouse left click
          if(e.button==0){
            if(this.className.indexOf("bombcover")!=-1){
              alert("Boom! Game over");
              newGame(difficulty);
            }else{
              if(this.className.indexOf("bomb")!=-1){
                // already un-covered
                // do nothing
              }else{
                // check and count any connecting mine
                thisX = parseInt(this.className.substr(this.className.indexOf("x")+1, 2));
                thisY = parseInt(this.className.substr(this.className.indexOf("y")+1, 2));
                let cntMine = 0;
                for(let y = -1;y<=1;y++){
                  for(let x = -1;x<=1;x++){
                    if(thisY+y<maxCol && thisY+y>0 && thisX+x<maxRow && thisX+x>0){
                      if(minefield[thisY+y][thisX+x] == 1){
                        cntMine ++;
                      }
                    }
                  }
                }
                document.querySelectorAll(".y"+thisY+".x"+thisX)[0].innerHTML = cntMine==0?"":cntMine;
                document.querySelectorAll(".y"+thisY+".x"+thisX)[0].className += " clear";
                if(cntMine==0){
                  // need to expose all other blank cells
              /*    for(let o = 0; o<3; o++){
                    for(let y = -o; y<=o; y++){
                      for(let x = -o; x<=o; x++){
                        if(thisY+y<maxCol && thisY+y>0 && thisX+x<maxRow && thisX+x>0){
                          if(minefield[thisY+y][thisX+x] == 0){
                            document.querySelectorAll(".y"+(thisY+y)+".x"+(thisX+x))[0].className += " clear";
                          }
                        }
                      }
                    }
                  }
                  */
                }
              }
            }
          }

          // handles mouse right click
          if(e.button==2 && this.className.indexOf("clear")==-1){
              if(this.className.indexOf("flagQuestion")==-1 && this.className.indexOf("flagBomb")==-1){
                this.className += " flagBomb";
                this.innerHTML = "!!";
              }else{
                if(this.className.indexOf("flagQuestion")==-1){
                  this.className = this.className.replace("flagBomb","");
                  this.className += "flagQuestion";
                  this.innerHTML = "?";
                }else{
                    this.className = this.className.replace("flagQuestion","");
                    this.innerHTML = "";
                }
              }
          }
        }, false);
      }
    }

    // launch a new game
    newGame(0);
