/*
	This JavaScript hides a picture (the "guest") within another picture (the "host").
	The principle is to convert all pixel values to 8 bits and replaces the host's weak bits by the guest's strong bits.
	To recover the image, we use the weak bits of the new picture and add 0000.

	-- HTML would contain: --

	<input id="actionButton" type=button value="Hide Guest" onclick="hidePic();" />
	<h1 id="op">Host image VS. Guest Image</h1>
	<canvas id="canvasHost" width="512" height="512" style="display:none;"></canvas> 
	<canvas id="canvasGuest" width="512" height="512" style="display:none;"></canvas> 
	<img id="picHost" src="host.jpg" />
	<img id="picGuest" src="guest.jpg" />	

*/

	function hidePic()
	{
		document.getElementById("canvasHost").style.display="inline";
		document.getElementById("canvasGuest").style.display="inline";

		var c=document.getElementById("canvasHost"); 	var ctx=c.getContext("2d");
		var d=document.getElementById("canvasGuest");	var dtx=d.getContext("2d");

		var img=document.getElementById("picHost"); ctx.drawImage(img,0,0);
		var imgB=document.getElementById("picGuest"); dtx.drawImage(imgB,0,0);		
		document.getElementById("picHost").style.display="none";
		document.getElementById("picGuest").style.display="none";

		var imgd = ctx.getImageData(0,0,512,512);	var pix = imgd.data;
		var imgdB = dtx.getImageData(0,0,512,512); 	var pixB = imgdB.data;

		// guest > host
		for (var i = 0; n = pix.length, i < n; i += 4) {

		  var hpxl=pix[i].toString(2); while(hpxl.length<8)hpxl="x"+hpxl;	// hpxl = host pixel red
		  var gpxl=pixB[i].toString(2); while(gpxl.length<8)gpxl="x"+gpxl;	// gpxl = guest pixel red	  
		  var npxl=hpxl.substr(0,4)+gpxl.substr(0,4);npxl=npxl.replace(/\x/g,"0");
		  var newPixel=parseInt(npxl, 2);
		  pixB[i] =  newPixel; // red channel

		  var hpxl=pix[i+1].toString(2); while(hpxl.length<8)hpxl="x"+hpxl;	// hpxl = host pixel blue
		  var gpxl=pixB[i+1].toString(2); while(gpxl.length<8)gpxl="x"+gpxl;	// gpxl = guest pixel blue	  
		  var npxl=hpxl.substr(0,4)+gpxl.substr(0,4);npxl=npxl.replace(/\x/g,"0");
		  var newPixel=parseInt(npxl, 2);
		  pixB[i+1] =  newPixel; // blue channel

		  var hpxl=pix[i+2].toString(2); while(hpxl.length<8)hpxl="x"+hpxl;	// hpxl = host pixel green
		  var gpxl=pixB[i+2].toString(2); while(gpxl.length<8)gpxl="x"+gpxl;	// gpxl = guest pixel green	  
		  var npxl=hpxl.substr(0,4)+gpxl.substr(0,4);npxl=npxl.replace(/\x/g,"0");
		  var newPixel=parseInt(npxl, 2);
		  pixB[i+2] =  newPixel; // green channel

		  pixB[i+3] = 255; // alpha channel
		}

		dtx.putImageData(imgdB, 0,0);
		document.getElementById("op").innerHTML="Host Image VS. Host Image (Guest hidden)";
		document.getElementById("actionButton").value="Reveal Guest";
		document.getElementById("actionButton").onclick=function(){showPic();};
	}

	function showPic()
	{
		var c=document.getElementById("canvasHost"); 	var ctx=c.getContext("2d");
		var d=document.getElementById("canvasGuest"); 	var dtx=d.getContext("2d");

		var img=document.getElementById("picGuest"); ctx.drawImage(img,0,0);
		var imgdB = dtx.getImageData(0,0,512,512); 	var pixB = imgdB.data;

		// host + guess > host
		for (var i = 0; n = pixB.length, i < n; i += 4) {

		  var hpxl=pixB[i].toString(2); while(hpxl.length<8)hpxl="x"+hpxl;	// hpxl = host pixel red 
		  var npxl=hpxl.substr(4,4)+"xxxx";npxl=npxl.replace(/\x/g,"0");
		  var newPixel=parseInt(npxl, 2);
		  pixB[i] =  newPixel; // red channel

		  var hpxl=pixB[i+1].toString(2); while(hpxl.length<8)hpxl="x"+hpxl;	// hpxl = host pixel blue 
		  var npxl=hpxl.substr(4,4)+"xxxx";npxl=npxl.replace(/\x/g,"0");
		  var newPixel=parseInt(npxl, 2);
		  pixB[i+1] =  newPixel; // blue channel

		  var hpxl=pixB[i+2].toString(2); while(hpxl.length<8)hpxl="x"+hpxl;	// hpxl = host pixel green
		  var npxl=hpxl.substr(4,4)+"xxxx";npxl=npxl.replace(/\x/g,"0");
		  var newPixel=parseInt(npxl, 2);
		  pixB[i+2] =  newPixel; // green channel

		  pixB[i+3] = 255; // alpha channel
		}

		dtx.putImageData(imgdB, 0,0);
		document.getElementById("op").innerHTML="Original guest VS. Guest (recovered)";
		document.getElementById("actionButton").value="Restart";
		document.getElementById("actionButton").onclick=function(){location.reload();};
	}

