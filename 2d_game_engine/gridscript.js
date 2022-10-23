/*
2022-10-23 : reshapes maps and perspective: top down rpg.
2022-10-22 : first draft. rendering functions. 2D platformer

*/

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
var gameMoveSpeed = 10;
var gameMapWidth = 100; // tiles long
var gameMapHeight = 200; // tiles deep
var gameMap = [new Array()];
var gameTileSize = 32;
/*	https://opengameart.org/content/lots-of-free-2d-tiles-and-sprites-by-hyptosis
		Credit to Hyptosis and Zabin from OGA.	*/
var gameImage = [];
var gameTilemap = [];
	gameTilemap['&grass01'] = '640;0';
	gameTilemap['&grass02'] = '384;0';
	gameTilemap['&dirt01'] = '0;576';
	gameTilemap['&wall01'] = '864;512';
// initialize full map array (blank)
for(let y=0; y<gameMapHeight; y++){
	gameMap[y] = new Array();
	for(let x=0; x<gameMapWidth; x++){
		gameMap[y][x] = "";
	}
}

// sample map (leave a black border around)
for(let y=1; y<gameMapHeight-2; y++){
	for(let x=1; x<gameMapWidth-2; x++){
		if(Math.random()>0.33){
			gameMap[y][x] = "&dirt01";
		}else{
			gameMap[y][x] = "&grass01";
		}
	}
}



function debug(){
	createScreen();
	startGameLoop();
}

// ---  CORE FUNCTIONS ---

function loadImage(imageName,imageURL){
	var i = document.createElement("img");
	i.style.display = 'none';
	i.src = imageURL;
	i.id = imageName;
	document.body.append(i);
	gameImage.push(i.id);
	gameImage['&'+i.id] = i;
}

function ifbi(n,z){
	return (n>z?z:n)
}

function drawScreen(){
	gameCtx.fillStyle = "black";
	gameCtx.clearRect(0,0,gameWidth,gameHeight);
	gameCtx.fillRect(0,0,gameWidth,gameHeight);
	for(let y=Math.floor(gameY/gameTileSize); y<ifbi(Math.floor(gameY/gameTileSize)+Math.floor(gameHeight/gameTileSize)+2,gameMapHeight); y++){
		for(let x=Math.floor(gameX/gameTileSize); x<ifbi(Math.floor(gameX/gameTileSize)+Math.floor(gameWidth/gameTileSize)+2,gameMapWidth); x++){
			if(gameMap[y][x]!=""){
				if(gameMap[y][x].substr(0,1)=="&"){
					var tileX = gameTilemap[gameMap[y][x]].split(";")[0];
					var tileY = gameTilemap[gameMap[y][x]].split(";")[1];
					gameCtx.drawImage(document.getElementById('tmap'), tileX, tileY, gameTileSize, gameTileSize, (x*gameTileSize)-gameX, (y*gameTileSize-gameY), gameTileSize, gameTileSize);
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
	var i = document.createElement("img");
		i.src = "./res/tilemap.png";
		i.style.display = "none";
		i.id = "tmap";
		document.body.append(i);
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
		gameX -= gameMoveSpeed;	// this moves the viewport, but what about the character? cannot always be centered
	}
	if(d=='right' && (Math.floor(gameX/gameTileSize)+Math.floor(gameWidth/gameTileSize)+2)<=gameMapWidth){
		gameX += gameMoveSpeed;	// this moves the viewport, but what about the character? cannot always be centered
	}
	if(d=='up' && gameY > 0){
		gameY -= gameMoveSpeed;	// this moves the viewport, but what about the character? cannot always be centered
	}
	if(d=='down' && (Math.floor(gameY/gameTileSize)+Math.floor(gameHeight/gameTileSize)+2)<=gameMapHeight){
		gameY += gameMoveSpeed;	// this moves the viewport, but what about the character? cannot always be centered
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
