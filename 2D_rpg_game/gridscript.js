
/* global variables */
var gameLoop;
var gameFPS = 33;
var gameWidth = 1024; // screen.width;
var gameHeight = 768; // screen.height;
var gameTileSize = 40; // can be dynamic  - will make the rendering bigger/smaller
var gameCvs;		// canvas
var gameCtx;		//  canvas' context
var gameX = 0;
var gameY = 0;
var gameGUIState = 0;
var gamePrintMessage = [];
var gameScreenMoving = false;
var gameDebugMode = 1;		// display information in the top left corner
var gameOriginX = 0; // unused
var gameOriginY = 0; // unused
var gameCharInput = true;			// if false, no move input is allowed (used for pause, dialogues, during cinematics...)
var gameCharX = gameTileSize*5;		// dynamically updating gameTileSize will mess up the X coord
var gameCharY = gameTileSize*5;		// dynamically updating gameTileSize will mess up the Y coord
var gameCharXPreMove = 0;
var gameCharYPreMove = 0;
var gameCharMoveDir = 0;
var gameCharTileFrameX = 1;
var gameCharTileFrameY = 1;
var gameCharTileSize = 77;	// based on the charmap (png)
var gameCharTileX = 10;
var gameCharTileY = 8;
var gameCharDirection = 3; // 1 top 2 right 3 down 4 left (which direction the character faces)
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
	gameTilemap['&dirt01'] = '1;576';
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
	gameTilemap['&hill01'] = '448;0'; // hill
	gameTilemap['&hill02'] = '480;0'; // hill+grass
	gameTilemap['&flower01'] = '448;96'; // hill+grass

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
	'&roof03','&roof04',	// allow to pass behind
	'&door02'		// allow to stand in the entrance
]

// ************************* HARDCODED ************************************ sample map with a black border around it ***********************
for(let y=1; y<gameMapHeight-2; y++){
	for(let x=1; x<gameMapWidth-2; x++){
		if(Math.random()>0.8){
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

// add some hills
for(var p=0;p<30;p++){
	gameMap[0][p] = "&hill01";
	gameMap[p][0] = "&hill01";
	gameMap[p][31] = ""; // let's limit the map for now
	gameMap[30][p] = "&hill01"; // let's limit the map for now
	gameMap[p][30] = "&hill01"; // let's limit the map for now
}
gameMap[30][30] = "&hill01";
gameMap[30][31] = ""; // let's limit the map for now

// add a special flower
gameMapL2[11][7] = "&flower01";
// ****************************************************************************************************************************************

function StartGame(){
	createScreen();
	startGameLoop();
	changeFramerate(60);
	changeTileSize(48);
	loadSound("bgmusic","./res/music.mp3");
}

function loadImage(imageName,imageURL){
	var i = document.createElement("img");
	i.style.display = 'none';
	i.src = imageURL;
	i.id = imageName;
	document.body.append(i);
	gameImage.push(i.id);
	gameImage['&'+i.id] = i;
}

function playSound(soundName){
	document.getElementById(soundName).play();
}
function stopSound(soundName){
	document.getElementById(soundName).pause();
}

function loadSound(soundName,soundURL){
	var i = document.createElement("audio");
	i.style.display = 'none';
	i.id = soundName;
	i.controls="";
	i.loop = true;
	var j = document.createElement("source");
	j.src = soundURL;
	j.type = "audio/mp3";
	i.append(j);
	document.body.append(i);
}

function ifbi(n,z){
	// if bigger; this function may not be required as we added a check in movement/input
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

	// we draw the character after both layers so we'll need to redraw any top layer hiding it afterwards
		if(!gameCharInput && !gameScreenMoving){
			if(gameCharMoveDir==4){
				if(gameCharX<=(gameCharXPreMove-gameMoveSpeed)){
					if(gameCharX<gameCharXPreMove-gameMoveSpeed){gameCharX=gameCharXPreMove-gameMoveSpeed}
					gameCharInput = true;
				}else{
					gameCharX -= (gameFPS/gameMoveSpeed)*5;
				}
			}
			if(gameCharMoveDir==2){
				if(gameCharX>=(gameCharXPreMove+gameMoveSpeed)){
					if(gameCharX>gameCharXPreMove+gameMoveSpeed){gameCharX=gameCharXPreMove+gameMoveSpeed}
					gameCharInput = true;
				}else{
					gameCharX += (gameFPS/gameMoveSpeed)*5;
				}
			}
			if(gameCharMoveDir==1){
				if(gameCharY<=(gameCharYPreMove-gameMoveSpeed)){
					if(gameCharY<gameCharYPreMove-gameMoveSpeed){gameCharY=gameCharYPreMove-gameMoveSpeed}
					gameCharInput = true;
				}else{
					gameCharY -= (gameFPS/gameMoveSpeed)*5;
				}
			}
			if(gameCharMoveDir==3){
				if(gameCharY>=(gameCharYPreMove+gameMoveSpeed)){
					if(gameCharY>gameCharYPreMove+gameMoveSpeed){gameCharY=gameCharYPreMove+gameMoveSpeed}
					gameCharInput = true;
				}else{
					gameCharY += (gameFPS/gameMoveSpeed)*5;
				}
			}
		}
		// hax - reset gameCharInput to false in case we are in a GUI
		if(gameGUIState!=0){gameCharInput=false}

		// probably can make this a function
		if(gameGUIState==0){
			switch(gameCharDirection){
				case 1:	gameCharTileFrameX = gameCharInput?308:(gameCharTileFrameX>=539?1:gameCharTileFrameX+gameCharTileSize); gameCharTileFrameY = 231; break;
				case 2:	gameCharTileFrameX = gameCharInput?308:(gameCharTileFrameX>=539?1:gameCharTileFrameX+gameCharTileSize); gameCharTileFrameY = 154; break;
				case 3:	gameCharTileFrameX = gameCharInput?308:(gameCharTileFrameX>=539?1:gameCharTileFrameX+gameCharTileSize); gameCharTileFrameY = 1; break;
				case 4:	gameCharTileFrameX = gameCharInput?308:(gameCharTileFrameX>=539?1:gameCharTileFrameX+gameCharTileSize); gameCharTileFrameY = 77; break;
			}
		}

		gameCtx.drawImage(gameImage['&hero'], gameCharTileFrameX, gameCharTileFrameY, gameCharTileSize, gameCharTileSize, gameCharX, gameCharY,  gameTileSize, gameTileSize);
		// need to redraw the top layer - in order to avoid visual artifacts during movements, we update all cells around the character
		for(var yo=gameCharTileY-1;yo<=gameCharTileY+1;yo++){
		for(var xo=gameCharTileX-1;xo<=gameCharTileX+1;xo++){
			if(gameMapL2[yo][xo].substr(0,1)=="&"){
				var tileX = gameTilemap[gameMapL2[yo][xo]].split(";")[0];
				var tileY = gameTilemap[gameMapL2[yo][xo]].split(";")[1];
				gameCtx.drawImage(document.getElementById('tmap'), tileX, tileY, gameTilemapSize, gameTilemapSize, (xo*gameTileSize)-gameX, (yo*gameTileSize-gameY), gameTileSize, gameTileSize);
			}
		}
		}

	// simulate night time
	if(new Date().getHours()>21 || new Date().getHours()<6){
			gameCtx.globalAlpha = 0.2;
			gameCtx.fillStyle = "blue";
			gameCtx.fillRect(0,0,gameWidth,gameHeight);
			gameCtx.globalAlpha = 1.0;
	}

	// draw GUI on top of it all
	// if we have a message to write
	if(gameGUIState==1){
		gameCtx.globalAlpha = 0.8;
		gameCtx.fillStyle = "black";
		gameCtx.fillRect(0,gameHeight-200,gameWidth, gameHeight);
		gameCtx.font = "20px Courier New";
		gameCtx.fillStyle = "#FFFF80";
		gameCtx.fillText(gamePrintMessage[0], 20, gameHeight-160);
		if(gamePrintMessage.length>1){gameCtx.fillText(gamePrintMessage[1], 20, gameHeight-120);}
		if(gamePrintMessage.length>2){gameCtx.fillText(gamePrintMessage[2], 20, gameHeight-80);}
		gameCtx.beginPath();
		gameCtx.moveTo((gameWidth/2)-10, gameHeight-40);
		gameCtx.lineTo(gameWidth/2, gameHeight-30);
		gameCtx.lineTo((gameWidth/2)+10, gameHeight-40);
		gameCtx.fill();
		gameCtx.globalAlpha = 1.0;
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

  // need to externalize this in separate function
	var i = document.createElement("img");
		i.src = "./res/tilemap.png";
		i.style.display = "none";
		i.id = "tmap";
		document.body.append(i);
	// this too
	loadImage("hero","./res/hero.png");	// load main character

	b.addEventListener("keydown", keyPressed ,false);
	b.focus();
}

function keyPressed(e){
	switch(e.keyCode){
			case 38:move('up');break;
			case 40:move('down');break;
			case 37:move('left');break;
			case 39:move('right');break;
			case 32:keyBind('action');break;
			case 121:
				e.preventDefault();
				e.stopPropagation();
				gameDebugMode=3-gameDebugMode;
			break;
			case 122:toggleFullscreen();break;
	}
}

function keyBind(k){
	if(k=='action'){

		// for example - character facing up and seeing a wall in top layer
		if(gameGUIState==0 && gameCharInput==true){

			// need a better way to handle interaction
			if(facedItem()=="&wall13"){
				printMessage("[You] This is a wall.");
				return  1;
			}
			if(facedItem()=="&flower01"){
				printMessage("[You] This is a pretty flower.");
				return  1;
			}

		}

		// if we are reading a message
		if(gameCharInput==false && gameGUIState==1 && gamePrintMessage.length>0){
				gamePrintMessage.splice(0,3);
				if(gamePrintMessage.length==0){
					gameGUIState = 0;
					gameCharInput = true;
				}
				return 1;
		}

	}
}

function facedItem(){
	var item = "";
	if(gameCharDirection==1){item = gameMapL2[gameCharTileY-1][gameCharTileX];}
	if(gameCharDirection==2){item = gameMapL2[gameCharTileY][gameCharTileX+1];}
	if(gameCharDirection==3){item = gameMapL2[gameCharTileY+1][gameCharTileX];}
	if(gameCharDirection==4){item = gameMapL2[gameCharTileY][gameCharTileX-1];}
	return item;	// return the texture of the item currently faced
}

// suggestion
// guiState = 0 (nothing); 1=msg, 2=options, 3=inventory, 4=battle...
function printMessage(msg){
 gameCharInput = false;
 gameGUIState = 1;

 // compute how many characters we can fit on one line
 // ISSUE : we should not split words
 gameCtx.font = "20px Courier New"; // 12 ...constant since we set 20px??
 let maxCharLen = (gameWidth-40)/12;
 for(var w=0;w<msg.length;w+=maxCharLen){
	 gamePrintMessage.push(msg.substring(w,w+maxCharLen));
 }

}

function moveAnim(d){
	gameCharXPreMove = gameCharX;
	gameCharYPreMove = gameCharY;
	gameCharInput = false;
	gameCharMoveDir = d;
}

function move(d){

	// movement is only possible if we are not already walking (gameCharInput=false)
	// note: we will not allow to change directing, else move values are messed up

	// PRESS LEFT KEY
	if(d=='left' && gameCharInput && !gameScreenMoving){
		gameCharDirection = 4;
		if(collideWith(gameCharTileX-1,gameCharTileY)==0){
			if(gameCharX<gameTileSize*2 && gameX > 0){
				// not clean
					gameScreenMoving = true;
					gameCharInput = false;
					var scrmv = setTimeout(function(){
						gameX -= gameMoveSpeed;	// this moves the viewport
						gameCharTileX -= 1;
						gameScreenMoving = false;
						gameCharInput = true;
					},300);
			}else{
			 //	gameCharX -= gameMoveSpeed;
			 	moveAnim(4);
				gameCharTileX -= 1;
			}
		}
	}
	// PRESS RIGHT KEY
	if(d=='right' && gameCharInput && !gameScreenMoving){
		gameCharDirection = 2;
		if(collideWith(gameCharTileX+1,gameCharTileY)==0){
			if(gameCharX>gameWidth-(gameTileSize*3) && (Math.floor(gameX/gameTileSize)+Math.floor(gameWidth/gameTileSize)+2)<=gameMapWidth){
				gameScreenMoving = true;
				gameCharInput = false;
				var scrmv = setTimeout(function(){
					gameX += gameMoveSpeed;	// this moves the viewport
					gameCharTileX += 1;
					gameScreenMoving = false;
					gameCharInput = true;
				},300);
			}else{
				// gameCharX += gameMoveSpeed;
				moveAnim(2);
				gameCharTileX += 1;
			}
		}
	}
	// PRESS UP KEY
	if(d=='up' && gameCharInput && !gameScreenMoving){
		gameCharDirection = 1;
	 	if(collideWith(gameCharTileX,gameCharTileY-1)==0){
			if(gameCharY<gameTileSize*2 && gameY > 0){
				// not clean
					gameScreenMoving = true;
					gameCharInput = false;
					var scrmv = setTimeout(function(){
						gameY -= gameMoveSpeed;	// this moves the viewport
						gameCharTileY -= 1;
						gameScreenMoving = false;
						gameCharInput = true;
					},300);
			}else{
				// gameCharY -= gameMoveSpeed;
				moveAnim(1);
				gameCharTileY -= 1;
			}
		}
	}
	// PRESS DOWN KEY
	if(d=='down' && gameCharInput && !gameScreenMoving){
		gameCharDirection = 3;
		if(collideWith(gameCharTileX,gameCharTileY+1)==0){
			if(gameCharY>gameHeight-(gameTileSize*3) && (Math.floor(gameY/gameTileSize)+Math.floor(gameHeight/gameTileSize)+2)<=gameMapHeight){
				// not clean
					gameScreenMoving = true;
					gameCharInput = false;
					var scrmv = setTimeout(function(){
						gameY += gameMoveSpeed;	// this moves the viewport
						gameCharTileY += 1;
						gameScreenMoving = false;
						gameCharInput = true;
					},300);
			}else{
				//	gameCharY += gameMoveSpeed;
				moveAnim(3);
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
		gameCtx.fillText("gameGUIState:"+gameGUIState, 10, 140);
		gameCtx.fillText("gameCharInput:"+gameCharInput, 10, 160);
		gameCtx.fillText("gamePrintMessage:"+gamePrintMessage, 10, 180);

	}
}

function changeTileSize(newSize){
	gameTileSize = newSize;
	gameCharX = gameCharTileX*newSize;
	gameCharY = gameCharTileY*newSize;
	gameMoveSpeed = newSize; // assuming we move tile by tile
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
