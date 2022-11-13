var mapKeyPressed = [];
var fps = 60;
var m = 0;
var textures = [];
var c = 0;
var ctx = 0;
var pX = 0;
var py = 0;
var pA = 0;

function loadTexture(url, textureName){
  textures.push(textureName);
  textures[textureName] = new Image();
  textures[textureName].src = url;
}

function drawScreen(){
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.save();
  ctx.translate(c.width/2, c.height/2);
  ctx.rotate(pA*Math.PI/180);
  ctx.drawImage(textures["ship"], pX-c.width/2, pY-c.height/2);
  ctx.restore();
}

function setup(){
  c = document.getElementById('cvs');
  ctx = c.getContext('2d');
  pX = c.width / 2;
  pY = c.height / 2;
  mapKeyPressed = [];
  document.addEventListener("keydown", function(e){
      e.preventDefault();
      e.stopPropagation();
      mapKeyPressed[e.code] = true;
  }, false);
  document.addEventListener('keyup', function(e){
     e.preventDefault();
     e.stopPropagation();
     mapKeyPressed[e.code] = false;
  }, false);

  var gameLoop = setInterval(drawScreen, 1000/fps);
  var keyCheck = setInterval(function(){
    // arrow keys to move and turn
    if(mapKeyPressed['ArrowUp']){movePlayer(1.5)}
    if(mapKeyPressed['ArrowDown']){movePlayer(-1.5)}
    if(mapKeyPressed['ArrowLeft']){turnPlayer(-1)}
    if(mapKeyPressed['ArrowRight']){turnPlayer(1)}
  },1000/fps);

  loadTexture("./ship.gif", "ship");
}

function movePlayer(v){
  pY += -v;
}
function turnPlayer(a){
  pA += a;
}
