		daysSpent=0;
		pingusCount=1;
		fish=0;
		iglooCount=1;
		timerFish=10;
		maxPingus=5;

		req_CreatePingus=10;
		req_UpgradeIgloo=25;

		$(document).ready(function(){

		snd = new Audio("./res/pingus1.wav");

			var timer_fishing=setInterval(function(){
				var pr=parseInt($("#pond-1").attr("rot"));		// only with one pond atm
				for(var p=1;p<=pingusCount;p++){
					tPR=parseInt($("#pingus-"+p).attr("rot"));
					if(tPR>(pr-5) && tPR<(pr+5)){
						fish+=1;
						$("#resCntFish").html("x"+fish);
					}
				}
			},timerFish*1000);
		
			$("#moveLeft").mousedown(function(){
				try{clearInterval(e);}catch(e){}
				e=setInterval(function(){move_world(0);},100);
			});

			$("#moveRight").mousedown(function(){
				try{clearInterval(e);}catch(e){}
				e=setInterval(function(){move_world(1);},100);
			});

			$("#moveLeft, #moveRight").mouseup(function(){
				try{clearInterval(e);}catch(e){}
			});

			/* event delegation */			
			$("#screen").on("mousedown",".unit", function(event){
				if(event.which==1)select_unit($(this));
			});

			$("#screen").mousedown(function(event){
				if(event.which==2)move_world(3);
				if(event.which==3)move_unit_to_pos(unitSelected);
			});

			$('#screen').bind("contextmenu",function(e){
			   e.preventDefault();
			   return false;
			}); 

			$('#screen').mousemove(function(e){
				   var parentOffset = $(this).offset(); 
				   var mx = e.pageX - parentOffset.left;
				   var curMapRot=parseInt($("#world").attr("rot"));
				   if(mx<=460){
						var ratio=460/mx;
						var newAngle=27/ratio;
						cursorAngle=parseInt(curMapRot-newAngle);
						cursorAngle+=27;
				   }
				   if(mx>460){
						var ratio=460/mx;
						var newAngle=27/ratio;
						cursorAngle=parseInt(curMapRot-newAngle);
						cursorAngle+=27;
				   }				  
			});

			var viewport=document.getElementById("screen");

			function rotateMap(e){
				var evt=window.event || e;
				var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta;
				if(delta<=-120){move_world(0)} else{ move_world(1);}
				if (evt.preventDefault) { evt.preventDefault() }else	{return false;}
			}

			var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
			if (viewport.attachEvent){
			viewport.attachEvent("on"+mousewheelevt, rotateMap)}
			else if (viewport.addEventListener) {
			viewport.addEventListener(mousewheelevt, rotateMap, false);}
		});
		

		function move_world(d){
					var r = (d==3)?0:parseInt($("#world").attr('rot'))+5;	if(d==1)r-=10;
					$("#world").css({
					  '-webkit-transform': 'rotate('+r+'deg)', '-moz-transform': 'rotate('+r+'deg)',
					  '-ms-transform': 'rotate('+r+'deg)',  '-o-transform': 'rotate('+r+'deg)',
					  'transform': 'rotate('+r+'deg)'
					}).attr('rot', r);
		}

		function move_unit_to_pos(thisUnit){
			if(thisUnit.hasClass("pingus")==true && thisUnit.hasClass("slide")==false){
				var unitAngle=parseInt(thisUnit.attr("rot"));
				var thisR=-cursorAngle;
				if(unitAngle<thisR){
					thisUnit.removeClass("sleft").addClass("sright");
				}	else{
					thisUnit.removeClass("sright").addClass("sleft");				
				}
				thisUnit.addClass("slide");
				thisUnit.css({'-webkit-transform': 'rotate('+thisR+'deg)', '-moz-transform': 'rotate('+thisR+'deg)',
					  '-ms-transform': 'rotate('+thisR+'deg)',  '-o-transform': 'rotate('+thisR+'deg)',
					  'transform': 'rotate('+thisR+'deg)'});
				var j=setTimeout(function(){
					thisUnit.removeClass("slide").removeClass("sright").removeClass("sleft");
					thisUnit.attr("rot",thisR);
					},4000);
			}
		}

		function upgradeIgloo(){
			if(fish>=req_UpgradeIgloo){
				maxPingus+=3;
				$("#resCapPop").html("MAX "+maxPingus);
				fish-=req_UpgradeIgloo;
				$("#resCntFish").html("x"+fish);				
			}else{
				showMsg("Not enough fish.");
			}
		}

		function createPingus(){
			if(fish>=req_CreatePingus && pingusCount<maxPingus){	
				createTimer=setTimeout(function(){
					pingusCount+=1;
						$("#world").append("<div id='pingus-"+pingusCount+"' class='pingus unit' unit-type='pingus' rot=0>&nbsp;</div>");							
						$("#resCntPingus").html("x"+pingusCount);
						fish-=req_CreatePingus;
						$("#resCntFish").html("x"+fish);
						clearTimeout(createTimer);
					},500);
				}else{
					showMsg("Not enough fish or population has reached its current maximum.");
				}
		}

		function select_unit(obj){
		    var thisType=obj.attr("unit-type");
			if(thisType=="igloo"){
				$("#hud_overview").attr("class","").addClass("hud_igloo");
				$("#hud_unitName").html("Igloo");
				$("#hud_unitDesc").html("Protects lil' penguins from the icy cold of the dark Arctic nights.</br></br><b>Population cap: "+maxPingus+"</b>");		
				$("#slot_1,#slot_2,#slot_3").unbind("mouseup");
				$("#slot_1").attr("class","slot action_igloo_upgrade").mouseup(function(){
					upgradeIgloo();
					});
					$("#desc_1").html("Increases population capacity (<b>Req: "+req_UpgradeIgloo+" fish)</b>");
				$("#slot_2").attr("class","slot action_igloo_createPingus").mouseup(function(){
					createPingus();
					});
					$("#desc_2").html("Summons a new fellow Pingus (<b>Req: "+req_CreatePingus+" fish)</b>");
				}

			if(thisType=="pingus"){
				snd.play();
				$("#hud_overview").attr("class","").addClass("hud_pingus");
				$("#hud_unitName").html("Pingus");
				$("#hud_unitDesc").html("A strong-willed creature with no fear whatsoever.</br></br>Can fish, build igloos and slide on its belly.</br>");
				$("#slot_1,#slot_2,#slot_3").unbind("mouseup");
				$("#slot_1").attr("class","");
				$("#slot_2").attr("class","");
				$("#slot_3").attr("class","");
				$("#desc_1").html("");
				$("#desc_2").html("");
				$("#desc_3").html("");
				if(closeToPond(obj)==true){
					$("#hud_unitDesc").html($("#hud_unitDesc").html()+"</br><b>Harvesting fish</b>");
				}
			}

			if(thisType=="pond"){
				$("#hud_overview").attr("class","").addClass("hud_pond");
				$("#hud_unitName").html("Pond");
				$("#hud_unitDesc").html("A fresh source of fish. Place a pingus nearby and it will start harvesting fish.</br></br><b>Harvest rate: 1 fish/"+timerFish+"s</b> (per pingus)");
				$("#slot_1").attr("class","");
				$("#slot_2").attr("class","");
				$("#slot_3").attr("class","");
				$("#desc_1").html("");
				$("#desc_2").html("");
				$("#desc_3").html("");
			}			

			unitSelected=obj;
			}

			function closeToPond(unit){
					var pr=parseInt($("#pond-1").attr("rot"));
					tPR=parseInt(unit.attr("rot"));
					if(tPR>(pr-5) && tPR<(pr+5)){
						i=true;
					}else{				
					  i=false;
					}
					return i;
			}

			function showMsg(msg){
				$("#msg").fadeOut(0);
				$("#msg").html(msg);
				$("#msg").css("left",460-($("#msg").width()/2));
				$("#msg").stop(true,true).show();
				$("#msg").fadeOut(4000);
			}
