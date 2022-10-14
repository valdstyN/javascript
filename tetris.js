// 15*25

var score = 0;
var level = 1;
var speed = 200;
var grid = [new Array()];
var piece = [0,0,0,0];
var s = 0;
var r = 0;
var ctx;
px = 6;
py = 0 ;
paused = false;
var drawLoop;
var updateLoop;

function updateGrid(){

// clear the array
for(var x=0;x<15;x++){
  for(var y=0;y<25;y++){
     if(grid[x][y]=="P"){
        grid[x][y]="";
      }
  }
}

collided = false;
for(var p=0;p<4; p++){
  // if any piece hits another block in the grid or touche the floor
  if(grid[piece[p][0]][piece[p][1]+1]=='X' || piece[p][1]+1==25){
      collided=true;
  }
}
if(!collided){
  for(var p=0;p<4; p++){
    piece[p][1]+=1;
    grid[piece[p][0]][piece[p][1]]="P";
  }
  py++;
}else{
    for(var p=0;p<4; p++){
      grid[piece[p][0]][piece[p][1]]="X";
    }
    for(var y=24;y>0;y--){
      var ln=0;
      for(var x=0;x<15;x++){
        if(grid[x][y]=="X"){ln++}
      }
      if(ln==15){
        score+=10;
        if(score>level*100){
          level++;
          speed-=20;
          clearInterval(updateLoop);
          updateLoop = setInterval(function(){
              if(!paused){
                updateGrid();
                document.getElementById("score").innerHTML="Score: "+score;
                document.getElementById("level").innerHTML="Level: "+level;
              }
          }, speed);
        }
        for(var x=0;x<15;x++){
          grid[x][y]="";
        }
        for(var u=y;u>1;u--){
          for(var v=0;v<15;v++){
            grid[v][u]=grid[v][u-1];
          }
        }
        y++;
      }
    }

    newPiece();
}

}

function renderGrid(){
    ctx.clearRect(0,0,300,500)
    for(var x=0;x<grid.length;x++){
      for(var y=0;y<grid[x].length;y++){
          if(grid[x][y]=="X" || grid[x][y]=="P"){
            ctx.fillRect(x*20, y*20, 20, 20);
          }
      }
    }
}

function rnd(max) {
    return Math.floor(Math.random() * max);
}

function newPiece(){
  px = 6;
  py = 0;
  s = rnd(5);
  r = 0;
  switch(s){
    case 0: // cube
      piece[0]=[px,py+1];
      piece[1]=[px+1,py+1];
      piece[2]=[px,py];
      piece[3]=[px+1,py];
      for(var p=0;p<4; p++){
        grid[piece[p][0]][piece[p][1]]="P";
      }
    break;
    case 1: // triangle
      piece[1]=[px+1,py];
      piece[2]=[px,py+1];
      piece[3]=[px+1,py+1];
      piece[0]=[px+2,py+1];
      for(var p=0;p<4; p++){
        grid[piece[p][0]][piece[p][1]]="P";
      }
    break;
    case 2: // line
      piece[0]=[px,py];
      piece[1]=[px+1,py];
      piece[2]=[px+2,py];
      piece[3]=[px+3,py];
      for(var p=0;p<4; p++){
        grid[piece[p][0]][piece[p][1]]="P";
      }
    break;
    case 3: // L shape
      piece[0]=[px,py+1];
      piece[1]=[px+1,py+1];
      piece[2]=[px+2,py+1];
      piece[3]=[px+2,py];
      for(var p=0;p<4; p++){
        grid[piece[p][0]][piece[p][1]]="P";
      }
    break;
    case 4: // S shape
      piece[2]=[px+1,py];
      piece[3]=[px+2,py];
      piece[0]=[px,py+1];
      piece[1]=[px+1,py+1];
      for(var p=0;p<4; p++){
        grid[piece[p][0]][piece[p][1]]="P";
      }
    break;
  }
}

function turnPiece(){
  switch (s) {
    case 0: // SQUATE - NO ROTATION
    break;
    case 1: // ROTATE TRIANGLE
      switch(r){
        case 0:
          piece[0]=[px,py+1];
          piece[1]=[px+1,py];
          piece[2]=[px+1,py+1];
          piece[3]=[px+1,py+2];
          r++;
        break;
        case 1:
          piece[0]=[px+1,py+1];
          piece[1]=[px,py];
          piece[2]=[px+1,py];
          piece[3]=[px+2,py];
          r++;
        break;
        case 2:
          piece[0]=[px+2,py+1];
          piece[1]=[px+1,py];
          piece[2]=[px+1,py+1];
          piece[3]=[px+1,py+2];
          r++;
        break;
        case 3:
          piece[1]=[px+1,py];
          piece[2]=[px,py+1];
          piece[3]=[px+1,py+1];
          piece[0]=[px+2,py+1];
          r=0;
        break;
      }
    break;
    case 2: // ROTATE LINE
      if(r==0){
        piece[0]=[px+1,py];
        piece[1]=[px+1,py+1];
        piece[2]=[px+1,py+2];
        piece[3]=[px+1,py+3];
        r=1;
      }else {
        piece[0]=[px,py];
        piece[1]=[px+1,py];
        piece[2]=[px+2,py];
        piece[3]=[px+3,py];
        r=0;
      }
    break;
    case 3: // ROTATE L-SHAPE
    switch(r){
      case 0:
        piece[0]=[px,py];
        piece[1]=[px+1,py];
        piece[2]=[px+1,py+1];
        piece[3]=[px+1,py+2];
        r++;
      break;
      case 1:
        piece[0]=[px,py];
        piece[1]=[px+1,py];
        piece[2]=[px+2,py];
        piece[3]=[px,py+1];
        r++;
      break;
      case 2:
        piece[0]=[px,py];
        piece[1]=[px,py+1];
        piece[2]=[px,py+2];
        piece[3]=[px+1,py+2];
        r++;
      break;
      case 3:
        piece[0]=[px,py+1];
        piece[1]=[px+1,py+1];
        piece[2]=[px+2,py+1];
        piece[3]=[px+2,py];
        r=0;
      break;
    }
    break;
    case 4: // ROTATE S-shape
    switch(r){
      case 0:
        piece[0]=[px+1,py];
        piece[1]=[px+1,py+1];
        piece[2]=[px+2,py+1];
        piece[3]=[px+2,py+2];
        r++;
      break;
      case 1:
        piece[2]=[px+1,py];
        piece[3]=[px+2,py];
        piece[0]=[px,py+1];
        piece[1]=[px+1,py+1];
        r=0
      break;
    }
    break;
  }
}

function mostRight(){
  i = px;
  for(var p=0;p<4; p++){
    if(piece[p][0]>i){
      i=piece[p][0];
    }
  }
  return i;
}
function mostLeft(){
  i = 25;
  for(var p=0;p<4; p++){
    if(piece[p][0]<i){
      i=piece[p][0];
    }
  }
  return i;
}

function move(dir){
  if(dir=="down"){
    updateGrid();
  }

  if(dir=="right" && mostRight()<14){
    collided=false;
    for(var p=0;p<4; p++){
      if(grid[piece[p][0]+1][piece[p][1]]=="X"){
        collided=true;
      }
    }
    if(!collided){
      for(var p=0;p<4; p++){
          grid[piece[p][0]][piece[p][1]]="";
          piece[p][0]+=1;
      }
      px++;
      return 0;
    }

  }
  if(dir=="left" && mostLeft()>0){
    collided=false;
    for(var p=0;p<4; p++){
      if(grid[piece[p][0]-1][piece[p][1]]=="X"){
        collided=true;
      }
    }
    if(!collided){
      for(var p=0;p<4; p++){
        grid[piece[p][0]][piece[p][1]]="";
        piece[p][0]-=1;
      }
      px--;
      return 0;
    }

  }
}

function keyPressed(e){
  switch(e.keyCode){
    case 38:turnPiece();break;
    case 40:move('down');break;
    case 37:move('left');break;
    case 39:move('right');break;
    case 80:
      if(paused){
        paused=false;
      }else{
        paused=true;
      }
    break;
  }
}

function startGame(){
  score = 0;
  level = 1;
  grid = [new Array()];
  piece = [0,0,0,0];
  s = 0;
  r = 0;
  px = 6;
  py = 0 ;
  for(var x=0;x<15;x++){
    grid[x]=new Array();
    for(var y=0;y<25;y++){
        grid[x][y]="";
    }
  }
  speed = 300;
  var del = document.getElementsByClassName("grid")[0];
  if(del)del.parentNode.removeChild(del);
  var b = document.createElement("div");
  b.className = "grid";
  b.tabIndex="1";
  var cvs = document.createElement("canvas");
  cvs.width = 300;
  cvs.height = 500;
  b.append(cvs);
  ctx = cvs.getContext('2d');
  ctx.fillStyle = 'green';  
  document.body.append(b);
  b.addEventListener("keydown", keyPressed ,false);
  newPiece();
  clearInterval(drawLoop);
  clearInterval(updateLoop);
  updateLoop = setInterval(function(){
      if(!paused){
        updateGrid();
        document.getElementById("score").innerHTML="Score: "+score;
        document.getElementById("level").innerHTML="Level: "+level;
      }
  }, speed);
  drawLoop = setInterval(function(){
      if(!paused){
        renderGrid();
      }
  }, 30);
  b.focus();
}
