
/* global variables */
var gameLoop;
var gameFPS = 33;
var gameWidth = 1024; // screen.width;
var gameHeight = 768; // screen.height - 48;
var gameTileSize = 40; // can be dynamic  - will make the rendering bigger/smaller
var gameCvs;
var gameCtx;
var gameX = 0;
var gameY = 0;
var gameDebugMode = 1;
var gameOriginX = 0; // unused
var gameOriginY = 0; // unused
var gameCharMove = false;
var gameCharX = gameTileSize*5;		// dynamically updating gameTileSize will mess up the X coord
var gameCharY = gameTileSize*5;		// dynamically updating gameTileSize will mess up the Y coord
var gameCharTileX = 5;
var gameCharTileY = 5;
var gameMoveSpeed = gameTileSize; // 10; if the value is different, the character will move freely, not within the map grid
var gameMapWidth = 100; // tiles long				-- will depend on the map loaded (need to update initialization)
var gameMapHeight = 200; // tiles deep			-- will depend on the map loaded (need to update initialization)
var gameMap = [new Array()];
var gameMapL2 = [new Array()];	// top layer (allows to draw on top of first layer - sprites, roofs, trees...)
var gameTilemapSize = 32; // fixed - this is used to crop the tilemap file
var gameImage = [];
var gameTilemap = [];	// see README.MD for credits (test tilemap)
	gameTilemap['&grass01'] = '640;0';
	gameTilemap['&grass02'] = '384;0';
	gameTilemap['&grass03'] = '416;0';
	gameTilemap['&dirt01'] = '0;576';
	gameTilemap['&path01'] = '480;928';
	gameTilemap['&path02'] = '512;928';
	gameTilemap['&path03'] = '544;928';
	gameTilemap['&path04'] = '512;896';
	gameTilemap['&wall01'] = '864;512'; // plain
	gameTilemap['&wall10'] = '800;480'; // top left
	gameTilemap['&wall11'] = '832;480'; // top
	gameTilemap['&wall12'] = '864;480'; // top right
	gameTilemap['&wall13'] = '768;512'; // left wall
	gameTilemap['&wall14'] = '832;512'; // right wall
	gameTilemap['&door01'] = '704;544'; // door top
	gameTilemap['&door02'] = '704;579'; // door below
	gameTilemap['&roof01'] = '640;704'; // roof left
	gameTilemap['&roof02'] = '704;704'; // roof right
	gameTilemap['&roof03'] = '800;608'; // roof top left
	gameTilemap['&roof04'] = '832;608'; // roof	top right
	gameTilemap['&roof05'] = '768;608'; // plain roof

// initialize full map array (blank)
for(let y=0; y<gameMapHeight; y++){
	gameMap[y] = new Array();
	gameMapL2[y] = new Array();	// top layer
	for(let x=0; x<gameMapWidth; x++){
		gameMap[y][x] = "";
		gameMapL2[y][x] = "";
	}
}

// used to check collision
var passThroughTile = [
	'&grass01',
	'&grass02',
	'&grass03',
  	'&dirt01',
	'&path01','&path02','&path03','&path04',
	'&roof03','&roof04',		// allow to pass behind
	'&door02'								// allow to stand in the entrance
]

// ************************* HARDCODED ************************************ sample map with a black border around it ***********************
for(let y=1; y<gameMapHeight-2; y++){
	for(let x=1; x<gameMapWidth-2; x++){
		if(Math.random()>0.7){
			gameMap[y][x] = "&dirt01";
		}else{
			gameMap[y][x] = "&grass02";
		}
	}
}
// add a house - note how door2 (entrance) is drawn on layer 1
// the roof corners are set in  layer 2 so the character can walk under
gameMapL2[4][10] = "&roof03";gameMapL2[4][11] = "&roof05";gameMapL2[4][12] = "&roof04";
gameMapL2[5][10] = "&roof01";gameMapL2[5][11] = "&wall11";gameMapL2[5][12] = "&roof02";
gameMapL2[6][10] = "&wall13";gameMapL2[6][11] = "&door01";gameMapL2[6][12] = "&wall14";
gameMapL2[7][10] = "&wall13";gameMap[7][11] = "&door02";gameMapL2[7][12] = "&wall14";

// add a path
for(var p=1;p<11;p++){
	gameMap[8][p] = "&path02";
}
gameMap[8][11] = "&path04";
gameMap[8][12] = "&grass02";
// ****************************************************************************************************************************************

function StartGame(){
	createScreen();
	startGameLoop();
	changeFramerate(60);
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
	// if bigger
	// this function may not be required as we added a check in movement/input
	return (n>z?z:n)
}

function drawScreen(){
	gameCtx.fillStyle = "black";
	gameCtx.clearRect(0,0,gameWidth,gameHeight);
	gameCtx.fillRect(0,0,gameWidth,gameHeight);

	for(let y=Math.floor(gameY/gameTileSize); y<ifbi(Math.floor(gameY/gameTileSize)+Math.floor(gameHeight/gameTileSize)+2,gameMapHeight); y++){
		for(let x=Math.floor(gameX/gameTileSize); x<ifbi(Math.floor(gameX/gameTileSize)+Math.floor(gameWidth/gameTileSize)+2,gameMapWidth); x++){

			// DRAW LAYER 1
			if(gameMap[y][x]!=""){
				if(gameMap[y][x].substr(0,1)=="&"){
					var tileX = gameTilemap[gameMap[y][x]].split(";")[0];
					var tileY = gameTilemap[gameMap[y][x]].split(";")[1];
					gameCtx.drawImage(document.getElementById('tmap'), tileX, tileY, gameTilemapSize, gameTilemapSize, (x*gameTileSize)-gameX, (y*gameTileSize-gameY), gameTileSize, gameTileSize);
				}
			}

			// DRAW CHARACTER (only once!)
			if(gameCharTileY==y && gameCharTileX==x){
				gameCtx.drawImage(gameImage['&char01'], gameCharX, gameCharY, gameTileSize, gameTileSize);
			}

			// DRAw LAYER 2
			if(gameMapL2[y][x]!=""){
				if(gameMapL2[y][x].substr(0,1)=="&"){
					var tileX = gameTilemap[gameMapL2[y][x]].split(";")[0];
					var tileY = gameTilemap[gameMapL2[y][x]].split(";")[1];
					gameCtx.drawImage(document.getElementById('tmap'), tileX, tileY, gameTilemapSize, gameTilemapSize, (x*gameTileSize)-gameX, (y*gameTileSize-gameY), gameTileSize, gameTileSize);
				}
			}
		}
	}
	// DRAW REST
	drawDebug();
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
	loadImage("char01","./res/char01.gif");	// load main character
	b.addEventListener("keydown", keyPressed ,false);
	b.focus();
}

function keyPressed(e){
	switch(e.keyCode){
	    case 38:move('up');break;
	    case 40:move('down');break;
	    case 37:move('left');break;
	    case 39:move('right');break;
	    case 121:
			e.preventDefault();
			e.stopPropagation();
			gameDebugMode=3-gameDebugMode;
			break;
	    case 122:toggleFullscreen();break;
	}
}

function move(d){
	// PRESS LEFT KEY
	if(d=='left'){
		if(collideWith(gameCharTileX-1,gameCharTileY)==0){
			if(gameCharX<gameTileSize*2 && gameX > 0){
				gameX -= gameMoveSpeed;	// this moves the viewport
				gameCharTileX -= 1;
			}else{
				gameCharX -= gameMoveSpeed;
				gameCharTileX -= 1;
			}
		}
	}
	// PRESS RIGHT KEY
	if(d=='right' && !gameCharMove){
		if(collideWith(gameCharTileX+1,gameCharTileY)==0){
			if(gameCharX>gameWidth-(gameTileSize*3) && (Math.floor(gameX/gameTileSize)+Math.floor(gameWidth/gameTileSize)+2)<=gameMapWidth){
				gameX += gameMoveSpeed;	// this moves the viewport
				gameCharTileX += 1;
			}else{
				gameCharX += gameMoveSpeed;
				gameCharTileX += 1;
			}
		}
	}
	// PRESS UP KEY
	if(d=='up'){
	 	if(collideWith(gameCharTileX,gameCharTileY-1)==0){
			if(gameCharY<gameTileSize*2 && gameY > 0){
				gameY -= gameMoveSpeed;	// this moves the viewport
				gameCharTileY -= 1;
			}else{
				gameCharY -= gameMoveSpeed;
				gameCharTileY -= 1;
			}
		}
	}
	// PRESS DOWN KEY
	if(d=='down'){
		if(collideWith(gameCharTileX,gameCharTileY+1)==0){
			if(gameCharY>gameHeight-(gameTileSize*3) && (Math.floor(gameY/gameTileSize)+Math.floor(gameHeight/gameTileSize)+2)<=gameMapHeight){
				gameY += gameMoveSpeed;	// this moves the viewport
				gameCharTileY += 1;
			}else{
				gameCharY += gameMoveSpeed;
				gameCharTileY += 1;
			}
		}
	}

}

function collideWith(newX,newY){
	// for example: return 0 = pass-through, 1 = solid, 2 = slowdown, 3 = trap...

	// border (black area)
	if(gameMap[newY][newX]==""){
		return 1;
	}
	// texture is not listed as walk-through-able
	if(passThroughTile.indexOf(gameMap[newY][newX])==-1){
		// second check - maybe the ground layer is unwalkable, but there is a bridge on top layer (listed as walkable)
		if(passThroughTile.indexOf(gameMapL2[newY][newX])==-1){
			return 1;
		}
	}else{
		// ...or maybe the ground was walkable, however the second layer is not
		if(passThroughTile.indexOf(gameMapL2[newY][newX])==-1 && gameMapL2[newY][newX]!=""){
			return 1;
		}
	}
	return 0; // nothing found to stop
}

function drawDebug(){
	if(gameDebugMode==1){
		gameCtx.font = "16px Calibri";
		gameCtx.fillStyle = "white";
		gameCtx.fillText("gameX,gameY:"+gameX+","+gameY, 10, 20);
		gameCtx.fillText("gameTileSize:"+gameTileSize, 10, 40);
		gameCtx.fillText("gameWidth,gameHeight:"+gameWidth+","+gameHeight, 10, 60);
		gameCtx.fillText("gameFPS:"+Math.floor((1/gameFPS*1000)), 10, 80);
		gameCtx.fillText("gameCharX,gameCharY:"+gameCharX+","+gameCharY, 10, 100);
		gameCtx.fillText("gameCharTileX,gameCharTileY:"+gameCharTileX+","+gameCharTileY, 10, 120);
	}
}

function resizeGame(newWidth, newHeight){
	document.getElementsByClassName("grid-main")[0].style.maxWidth = newWidth+"px";
	document.getElementsByClassName("grid-main")[0].style.maxHeight = newHeight+"px";
	gameCvs.width = newWidth;
	gameCvs.height = newHeight;
	gameWidth = newWidth;
	gameHeight = newHeight;
}

function changeFramerate(newFPS){
	stopGameLoop();
	gameFPS = 1000/newFPS;
	startGameLoop();
}

function toggleFullscreen(){
	if(gameWidth!=screen.width){
		resizeGame(screen.width, screen.height);
	}else{
		resizeGame(1024, 768);
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
