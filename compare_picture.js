/* ------- sample usage -------
<script src="compare_picture.js"></script> 

...

<div id="mydiv"></div>
<script type="text/javascript">
compareImg("./before.jpg","./after.jpg", "mydiv");
</script>
------------------------------- */

function compareImg(before,after,divElem){
  h = document.getElementById(divElem);h.style.position = "relative";
  a = document.createElement("img");a.src = before;a.style.position = "absolute";
  b = document.createElement("img");b.src = after; b.style.position = "absolute";
  h.appendChild(a);h.appendChild(b);
  a.style.clipPath="inset(0 50% 0 0)";b.style.clipPath="inset(0 0 0 50%)";
  h.onmousemove = function(){
    h.style.cursor = "ew-resize";
    absx = event.clientX; // grab mouse x
    wX = a.width; // 100%
    rX = a.getBoundingClientRect().left; // 0%
    pc = 100/wX*(absx-rX);// compute where the mouse is in %
    a.style.clipPath="inset(0 "+(100-pc)+"% 0 0)";b.style.clipPath="inset(0 0 0 "+pc+"%)";
  }
  h.onmouseleave = function(){
    h.style.cursor = "pointer";
   }
}