/* global variables */
var gameLoop;
var gameFPS = 33;
var gameWidth = 1024;
var gameHeight = 780;
var gameCvs;
var gameCtx;
var gameX = 0;
var gameY = 0;
var gameOriginX = 0;
var gameOriginY = 0;
var gameMapWidth = 100; // tiles long
var gameMapHeight = 200; // tiles deep
var gameMap = [new Array()];
var gameTileSize = 48;
var gameImage = [];

// --- DEBUG FUNCTIONS ---
for(let y=0; y<gameMapHeight; y++){
	gameMap[y] = new Array();
	for(let x=0; x<gameMapWidth; x++){
		gameMap[y][x] = "black"; // background
	}
}
// add dirt
var a = 1;
for(let y=10; y<gameMapHeight; y++){
	gameMap[y] = new Array();
	for(let x=0; x<gameMapWidth; x++){
		a = 1; //3-a;
		if(x>5){
			gameMap[y][x] = "&dirt"; // background
		}else{
			gameMap[y][x] = "black";
		}
	}
}



function debug(){
	var i = document.createElement("img");
	i.src = "./res/mario.gif";
	i.style.position = "absolute";
	i.style.top = "355px";
	i.style.left = "500px";
	i.id = "mario";
	document.body.append(i);
	createScreen();
	loadImage("dirt","./res/dirt_01.gif");
	startGameLoop();
}

// ---  CORE FUNCTIONS ---

// draw ONLY what is in scope
// gameX,gameY define the top left corner of the view scope (moves when character moves)

function loadImage(imageName,imageURL){
	var i = document.createElement("img");
	i.style.display = 'none';
	i.src = imageURL;
	i.id = imageName;
	document.body.append(i);
	gameImage.push(i.id);
	gameImage['&'+i.id] = i;
}

function drawScreen(){
	gameCtx.fillStyle = "black";
	gameCtx.clearRect(0,0,gameWidth,gameHeight);
	gameCtx.fillRect(0,0,gameWidth,gameHeight);

	for(let y=Math.floor(gameY/gameTileSize); y<Math.floor(gameY/gameTileSize)+Math.floor(gameHeight/gameTileSize)+2; y++){
		for(let x=Math.floor(gameX/gameTileSize); x<Math.floor(gameX/gameTileSize)+Math.floor(gameWidth/gameTileSize)+2; x++){
			// draw plain
			// gameCtx.fillStyle = gameMap[y][x];
			// gameCtx.fillRect(x*gameTileSize,y*gameTileSize,gameTileSize,gameTileSize);
			// draw sprite
			if(gameMap[y][x]!=""){
				if(gameMap[y][x].substr(0,1)=="&"){
					gameCtx.drawImage(gameImage[gameMap[y][x]], (x*gameTileSize)-gameX, y*gameTileSize, gameTileSize, gameTileSize);
				}
			}
		}
	}
}

function createScreen(){
	var del = document.getElementsByClassName("grid-main")[0];
  	if(del){
		del.parentNode.removeChild(del);
	}
	var b = document.createElement("div");
 		b.className = "grid-main";
 		b.style.maxWidth = gameWidth+"px";
 		b.style.maxHeight = gameHeight+"px";
 		b.tabIndex="1";
	gameCvs = document.createElement("canvas");
 		gameCvs.width = gameWidth;
 		gameCvs.height = gameHeight;
 	b.append(gameCvs);
 	gameCtx = gameCvs.getContext('2d');
	gameCtx.fillStyle = 'black';
	gameCtx.fillRect(0,0,gameWidth,gameHeight);
	document.body.append(b);
  	b.addEventListener("keydown", keyPressed ,false);
	b.focus();
}

function keyPressed(e){
	switch(e.keyCode){
    case 38:move('up');break;
    case 40:move('down');break;
    case 37:move('left');break;
    case 39:move('right');break;
	}
}

function move(d){
	if(d=='left' && gameX > 0){
		document.getElementById("mario").style.transform="scaleX(-1)";
		gameX -= 5;
	}
	if(d=='right'){
		document.getElementById("mario").style.transform="scaleX(1)";
		gameX += 5;
	}
}

function drawSprite(){

}

function startGameLoop(){
	gameLoop = setInterval(function(){
		drawScreen();
	}, gameFPS);
}

function stopGameLoop(){
	clearInterval(gameLoop);
}

// --- ADDITIONAL FUNCTIONS ---

function setTheme(idTheme){
}
function inputMessage(msg, arrayOptions){
	return reply;
}
function showMessage(msg){
}
function playSound(domAudio){
}
function playMusic(domMusic){
}
function stopMusic(){
}
