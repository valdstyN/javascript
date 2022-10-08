dir=0;
snake=new Array(new Array());
oldsnake=new Array(new Array());
snake[0][0]=160;
snake[0][1]=120;
score=0;

function new_game(){
	b=document.createElement("div");
	b.id="board";
	b.tabIndex="1";
	document.getElementsByTagName("body")[0].appendChild(b);
	s=document.createElement("div");
	s.id="sn_head";
	document.getElementById("board").appendChild(s);
	addBonus();
	b.addEventListener("keydown",turn ,false);
	var tmr=setInterval(function(){
		move();
	}, 150);
	b.focus();
}

function addBonus(){
	xpos=Math.floor((Math.random()*32))*10;
	ypos=Math.floor((Math.random()*24))*10;
	s=document.createElement("div");
	s.id="bonus";
	document.getElementById("board").appendChild(s);
	document.getElementById("bonus").style.left=xpos+"px";
	document.getElementById("bonus").style.top=ypos+"px";
}

function move(){
	oldsnake[0][0]=parseInt(document.getElementById("sn_head").style.left);
	oldsnake[0][1]=parseInt(document.getElementById("sn_head").style.top);
	var allParts=document.getElementsByClassName("snake");
	for (var i=1; i<allParts.length; i++) {
  oldsnake[i][0]=parseInt(allParts[i-1].style.left);
  oldsnake[i][1]=parseInt(allParts[i-1].style.top);
}

	switch(dir){
	 case 0: snake[0][0]=snake[0][0]-10;break;
	 case 1: snake[0][1]=snake[0][1]-10;break;
	 case 2: snake[0][0]=snake[0][0]+10;break;
	 case 3: snake[0][1]=snake[0][1]+10;break;
	}
	if(snake[0][0]<0)snake[0][0]=310; if(snake[0][0]>310)snake[0][0]=0;
	if(snake[0][1]<0)snake[0][1]=230; if(snake[0][1]>230)snake[0][1]=0;
	document.getElementById("sn_head").style.left=snake[0][0]+"px";
	document.getElementById("sn_head").style.top=snake[0][1]+"px";
	testCollision();

	var allParts=document.getElementsByClassName("snake");
	for(var i=1;i<snake.length;i++){
		snake[i][0]=oldsnake[i-1][0];
		snake[i][1]=oldsnake[i-1][1];
		allParts[i-1].style.left=snake[i][0]+"px";
		allParts[i-1].style.top=snake[i][1]+"px";
	}
}

function testCollision(){
	if(snake[0][0]==xpos && snake[0][1]==ypos){
		document.getElementById("board").removeChild(document.getElementById("bonus"));
		addBonus(); score=score+10;
		growBody();
		document.getElementById("scoreboard").innerHTML="Score:&nbsp;"+score;
	}
}

function growBody(){
 s=document.createElement("div");
 s.className="snake";
 document.getElementById("board").appendChild(s);
 snake[snake.length]=[];
 oldsnake[oldsnake.length]=[];
}

function turn(ev){
	if(ev.keyCode==37){
	dir-=1;
	if(dir<0)dir=3;
	}
	if(ev.keyCode==39){
	dir+=1;
	if(dir>3)dir=0;
	}
}
